export function parseAutoSlideText(text) {
  if (!text) return [];

  const slidesData = [];

  const knownRootKeys = [
    'title', 'title_left', 'video_url', 'activity_type', 'question', 'image_url',
    'instruction', 'options', 'sentence', 'items', 'left_col', 'right_col',
    'sentence_parts', 'col1_heading', 'col1_subheading', 'col1_lines',
    'col2_heading', 'col2_subheading', 'col2_lines', 'content', 'words', 'chant_lines',
    'layout', 'bg_color', 'subtitle', 'elements', 'elements_left', 'elements_right',
    'embed_url', 'note_title', 'word', 'type', 'meaning', 'rule', 'question_number', 'answer',
    'box_title', 'audio_url', 'correct_option', 'passage'
  ];

  const arrayKeys = [
    'options', 'sentence', 'items', 'left_col', 'right_col', 'sentence_parts',
    'col1_lines', 'col2_lines', 'words', 'chant_lines', 'elements', 'elements_left', 'elements_right',
    'passage'
  ];

  // 1. Phục hồi định dạng (Reconstruct broken formatting)
  let cleanText = text.replace(/^---+/gm, '').trim();
  cleanText = cleanText.replace(/(\[[A-Za-z]+\])/g, '\n$1\n');

  // Khôi phục các root key bị AI viết liền trên cùng 1 dòng (chỉ áp dụng cho dòng không phải mảng)
  let processedLines = cleanText.split('\n').map(line => {
    let l = line.trim();
    if (l.startsWith('- ') || l.startsWith('* ')) return line; // Bỏ qua các dòng mảng

    knownRootKeys.forEach(k => {
      const regex = new RegExp(`\\s+(${k}):`, 'g');
      line = line.replace(regex, '\n$1:');
    });
    return line;
  });
  cleanText = processedLines.join('\n');

  // 2. Tách slide
  const blocks = cleanText.split(/(?=\[[A-Za-z]+\])/g).map(b => b.trim()).filter(b => b.length > 0);

  blocks.forEach(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    const typeMatch = lines[0].match(/^\[(.*?)\]/);
    if (!typeMatch) return;

    const slideType = typeMatch[1];
    const slideData = {};
    let currentKey = null;

    lines.shift(); // Bỏ dòng [SlideType]

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      const colIdx = line.indexOf(':');
      let isRootKey = false;

      if (colIdx > -1 && !line.startsWith('- ')) {
        const potentialKey = line.substring(0, colIdx).trim();
        if (knownRootKeys.includes(potentialKey)) {
          isRootKey = true;
          currentKey = potentialKey;
          const val = line.substring(colIdx + 1).trim();
          slideData[currentKey] = val !== '' ? parseValue(val) : (arrayKeys.includes(currentKey) ? [] : '');
          if (val === '' && arrayKeys.includes(currentKey)) {
            slideData[currentKey] = [];
          }
          continue;
        }
      }

      // Xử lý Array Items
      if (currentKey && arrayKeys.includes(currentKey)) {
        if (!Array.isArray(slideData[currentKey])) {
          slideData[currentKey] = [];
        }

        let rawItem = line;
        if (line.startsWith('- ')) rawItem = line.substring(2).trim();
        else if (line.startsWith('* ')) rawItem = line.substring(2).trim();

        if (rawItem.includes('|')) {
          const itemObj = {};
          const segments = rawItem.split('|').map(s => s.trim());
          segments.forEach(seg => {
            const subColIdx = seg.indexOf(':');
            if (subColIdx > -1) {
              const k = seg.substring(0, subColIdx).trim();
              const v = parseValue(seg.substring(subColIdx + 1).trim());
              itemObj[k] = v;
            }
          });
          slideData[currentKey].push(itemObj);
        } else {
          // Object item without pipe (e.g. text: 1. The Maya...)
          const subColIdx = rawItem.indexOf(':');
          if (subColIdx > -1 && !rawItem.startsWith('http')) {
            const itemObj = {};
            const k = rawItem.substring(0, subColIdx).trim();
            const v = parseValue(rawItem.substring(subColIdx + 1).trim());
            itemObj[k] = v;
            slideData[currentKey].push(itemObj);
          } else {
            slideData[currentKey].push(parseValue(rawItem));
          }
        }
      }
      // Xử lý Text nhiều dòng (Multline string)
      else if (currentKey && !isRootKey) {
        if (typeof slideData[currentKey] === 'string') {
          // Replace literal \n in string if it exists, else just append with real newline
          slideData[currentKey] += '\n' + line;
        }
      }
    }

    slidesData.push(formatSlideData(slideType, slideData));
  });

  return slidesData;
}

function parseValue(val) {
  // Trích xuất link nếu value bị bọc bởi markdown link: [text](url)
  const linkMatch = val.match(/\[(.*?)\]\((https?:\/\/[^\)]+)\)/);
  if (linkMatch && linkMatch[1] && linkMatch[2]) {
    // Nếu text bên trong [] cũng là 1 cái link ảnh (chứa http), ưu tiên lấy text
    if (linkMatch[1].startsWith('http')) return linkMatch[1].trim();
    return linkMatch[2].trim(); // Trả về url trần
  }
  if (val.toLowerCase() === 'true') return true;
  if (val.toLowerCase() === 'false') return false;
  if (!isNaN(val) && val !== '') return Number(val);
  return val.replace(/\\n/g, '\n');
}

// Convert parsed flat data into the nested structure App components expect
function formatSlideData(type, raw) {
  const data = { type };

  switch (type) {
    case 'UnitTitle':
    case 'SectionSlide':
    case 'ReadSlide':
    case 'GrammarSlide':
    case 'ExerciseSlide':
    case 'ReadQuestionSlide':
    case 'ChantSlide':
    case 'GuessWordSlide':
      data.props = { data: { ...raw } };
      break;

    case 'Vocabulary':
      data.props = { data: { ...raw } };
      break;

    case 'VocabularyList':
      // The array of words is already structured if they used 'word: bike | translation: đạp xe'
      data.props = { data: { ...raw } };
      break;

    case 'VideoActivity':
      const activityData = {
        title_left: raw.title_left,
        video_url: raw.video_url,
        activity: {
          type: raw.activity_type,
          question: raw.question,
          image_url: raw.image_url,
          instruction: raw.instruction,
          options: raw.options,
          sentence: raw.sentence,
          items: raw.items,
          left_col: raw.left_col,
          right_col: raw.right_col,
          sentence_parts: raw.sentence_parts
        }
      };

      // Clean up undefined properties from activity
      Object.keys(activityData.activity).forEach(key =>
        activityData.activity[key] === undefined && delete activityData.activity[key]
      );

      data.props = { data: activityData };
      break;

    case 'Writing':
      data.props = {
        data: {
          title: raw.title || "Writing",
          note: {
            title: raw.note_title || "Note",
            layout: raw.layout || "two_columns",
            columns: [
              {
                heading: raw.col1_heading,
                subheading: raw.col1_subheading,
                lines: raw.col1_lines || []
              },
              raw.col2_heading ? {
                heading: raw.col2_heading,
                subheading: raw.col2_subheading,
                lines: raw.col2_lines || []
              } : null
            ].filter(Boolean)
          },
          // Fallback if they write activity instead of note
          activity: raw.activity_type ? {
            type: raw.activity_type,
            question: raw.question,
            instruction: raw.instruction,
            sentence_parts: raw.sentence_parts
          } : undefined
        }
      };
      break;

    default:
      data.props = { data: { ...raw } };
  }

  return data;
}
