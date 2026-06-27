import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function DynamicActivity({ activity }) {
  if (!activity) return null;

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [numberedAnswers, setNumberedAnswers] = useState({});
  const [blankAnswers, setBlankAnswers] = useState({});
  const [matchingState, setMatchingState] = useState({ pairs: {}, selectedLeft: null });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const matchingColors = ["#ff9ff3", "#feca57", "#ff6b6b", "#48dbfb", "#1dd1a1", "#54a0ff", "#5f27cd", "#ff7f50"];

  const handleCheckboxClick = (id) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNumberingClick = (id) => {
    if (isSubmitted) return;
    setNumberedAnswers(prev => {
      if (prev[id]) {
        const newAns = { ...prev };
        delete newAns[id];
        return newAns;
      } else {
        const currentNumbers = Object.values(prev);
        const nextNum = currentNumbers.length > 0 ? Math.max(...currentNumbers) + 1 : 1;
        return { ...prev, [id]: nextNum };
      }
    });
  };

  const handleBlankChange = (id, value) => {
    if (isSubmitted) return;
    setBlankAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleMatchingLeft = (id) => {
    if (isSubmitted) return;
    setMatchingState(prev => ({ ...prev, selectedLeft: id === prev.selectedLeft ? null : id }));
  };

  const handleMatchingRight = (id) => {
    if (isSubmitted) return;
    setMatchingState(prev => {
      if (!prev.selectedLeft) return prev;
      const newPairs = { ...prev.pairs };
      Object.keys(newPairs).forEach(key => {
        if (newPairs[key] === id) delete newPairs[key];
      });
      newPairs[prev.selectedLeft] = id;
      return { pairs: newPairs, selectedLeft: null };
    });
  };

  const handleSubmit = () => {
    if (isSubmitted) {
      // Reset
      setIsSubmitted(false);
      setSelectedAnswers({});
      setNumberedAnswers({});
      setBlankAnswers({});
      setMatchingState({ pairs: {}, selectedLeft: null });
    } else {
      setIsSubmitted(true);
    }
  };

  const renderSubmitButton = () => {
    return (
      <div className="w-full flex justify-center mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className={`px-8 py-3 rounded-full font-bold text-[1.4rem] lg:text-[1.6rem] text-white shadow-md transition-colors ${isSubmitted ? "bg-[#f39c12] hover:bg-[#e67e22]" : "bg-[#2ecc71] hover:bg-[#27ae60]"
            }`}
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          {isSubmitted ? "Try Again" : "Check Answers"}
        </motion.button>
      </div>
    );
  };

  switch (activity.type) {
    case 'checkbox':
      return (
        <div className="w-full flex flex-col h-full relative pb-16">
          {activity.question && (
            <h3 className="text-[1.6rem] lg:text-[1.8rem] font-extrabold text-[#7b5cda] mb-6 text-center leading-tight px-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {activity.question}
            </h3>
          )}

          <div className="flex-1 overflow-y-auto custom-scrollbar w-full mb-4 pb-20 px-2">
            {activity.image_url && (
              <div className="w-full shrink-0 h-[220px] lg:h-[300px] rounded-[32px] overflow-hidden mb-8 shadow-sm">
                <img src={activity.image_url} alt="Activity" className="w-full h-full object-cover" />
              </div>
            )}

            <div className="flex flex-row items-center justify-center gap-6 lg:gap-10 mt-auto flex-wrap">
              {activity.options?.map((opt) => {
                const isSelected = selectedAnswers[opt.id];
                let boxStyle = "bg-[#fae596] border-[#fae596] opacity-60";
                if (isSelected) boxStyle = "bg-[#fae596] border-[#fae596]";

                let feedbackIcon = null;
                if (isSubmitted) {
                  if (opt.is_correct && isSelected) {
                    boxStyle = "bg-[#2ecc71] border-[#2ecc71] text-white"; // Correct & selected
                    feedbackIcon = "✓";
                  } else if (opt.is_correct && !isSelected) {
                    boxStyle = "border-[#2ecc71] border-dashed border-4 bg-transparent"; // Missed correct
                  } else if (!opt.is_correct && isSelected) {
                    boxStyle = "bg-[#e74c3c] border-[#e74c3c] text-white"; // Incorrect & selected
                    feedbackIcon = "✗";
                  }
                }

                return (
                  <div
                    key={opt.id}
                    className={`flex items-center gap-3 group ${isSubmitted ? 'cursor-default' : 'cursor-pointer hover:opacity-80'}`}
                    onClick={() => handleCheckboxClick(opt.id)}
                  >
                    <div className={`relative w-8 h-8 lg:w-10 lg:h-10 rounded-xl border-2 flex items-center justify-center transition-all shadow-sm ${boxStyle}`}>
                      {!isSubmitted && isSelected && (
                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-[#2ecc71] stroke-[4] strokeLinecap-round strokeLinejoin-round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                      {isSubmitted && feedbackIcon && (
                        <span className="font-bold text-white leading-none">{feedbackIcon}</span>
                      )}
                    </div>
                    <span className={`text-[1.2rem] lg:text-[1.4rem] font-bold ${isSubmitted && opt.is_correct ? 'text-[#2ecc71]' : 'text-[#2f3542]'}`} style={{ fontFamily: "'Nunito', sans-serif" }}>
                      {opt.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full">
            {renderSubmitButton()}
          </div>
        </div>
      );

    case 'circling':
      return (
        <div className="w-full flex flex-col h-full relative pb-16">
          {activity.question && (
            <h3 className="text-[1.6rem] lg:text-[1.8rem] font-extrabold text-[#7b5cda] mb-8 text-center leading-tight px-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {activity.question}
            </h3>
          )}
          <div className="flex-1 mt-4 px-4 overflow-y-auto custom-scrollbar pb-20 flex justify-center">
            <div className="text-left leading-[3.5rem] lg:leading-[4rem] inline-block max-w-full">
              {activity.sentence?.map((part, index) => {
                if (part.clickable) {
                  const isSelected = selectedAnswers[index];
                  let styleClass = isSelected ? 'border-[#e74c3c] text-[#e74c3c] shadow-md bg-red-50' : 'border-transparent text-[#2f3542] bg-gray-50';

                  if (isSubmitted) {
                    if (isSelected && part.is_correct) {
                      styleClass = 'border-[#2ecc71] bg-[#2ecc71] text-white shadow-md';
                    } else if (isSelected && !part.is_correct) {
                      styleClass = 'border-[#e74c3c] bg-[#e74c3c] text-white shadow-md line-through';
                    } else if (!isSelected && part.is_correct) {
                      styleClass = 'border-[#2ecc71] border-dashed text-[#2ecc71] bg-green-50';
                    }
                  } else {
                    styleClass += ' hover:bg-gray-100 hover:border-gray-300';
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (!isSubmitted) {
                          setSelectedAnswers(prev => ({
                            ...prev,
                            [index]: !prev[index]
                          }));
                        }
                      }}
                      className={`inline-flex items-center justify-center px-4 py-2 mx-1 lg:mx-2 rounded-full border-2 font-bold text-[1.2rem] lg:text-[1.4rem] transition-all duration-300 align-middle ${styleClass}`}
                      disabled={isSubmitted}
                    >
                      {part.text}
                    </button>
                  );
                }

                return (
                  <span key={index} className="text-[#2f3542] text-[1.2rem] lg:text-[1.4rem] font-bold align-middle whitespace-pre-wrap">
                    {(part.text || "").split(/\\n|\n/).map((line, i, arr) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-4 left-0 w-full flex justify-center z-10">
            {renderSubmitButton()}
          </div>
        </div>
      );

    case 'numbering':
      return (
        <div className="w-full flex flex-col h-full relative pb-16">
          {activity.question && (
            <h3 className="text-[1.6rem] lg:text-[1.8rem] font-extrabold text-[#7b5cda] mb-4 text-center leading-tight px-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {activity.question}
            </h3>
          )}
          <div className="flex-1 overflow-y-auto custom-scrollbar w-full mb-4 px-6 pb-20 mt-4">
            <div className="flex flex-col gap-4 w-full">
              {activity.items?.map((item) => {
                const num = numberedAnswers[item.id];
                let boxStyle = num ? "bg-[#5e54d6] border-[#5e54d6] text-white" : "bg-white border-[#bdc3c7]";

                if (isSubmitted) {
                  if (num === item.correct_order) {
                    boxStyle = "bg-[#2ecc71] border-[#2ecc71] text-white";
                  } else if (num) {
                    boxStyle = "bg-[#e74c3c] border-[#e74c3c] text-white";
                  } else {
                    boxStyle = "border-[#2ecc71] border-dashed text-[#2ecc71]";
                  }
                }

                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-6 group bg-gray-50 rounded-2xl p-4 border-2 transition-all ${isSubmitted ? 'border-transparent' : 'cursor-pointer border-transparent hover:border-[#bde0fe] hover:shadow-sm'}`}
                    onClick={() => handleNumberingClick(item.id)}
                  >
                    <div className={`w-12 h-12 shrink-0 rounded-xl border-[3px] flex items-center justify-center transition-all shadow-sm ${boxStyle}`}>
                      {(num || (isSubmitted && !num)) && (
                        <span className="text-2xl font-bold" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                          {isSubmitted && !num ? item.correct_order : num}
                        </span>
                      )}
                    </div>
                    <span className={`text-[1.2rem] lg:text-[1.4rem] font-bold leading-tight flex-1 ${isSubmitted && num === item.correct_order ? 'text-[#2ecc71]' : 'text-[#2f3542]'}`} style={{ fontFamily: "'Nunito', sans-serif" }}>
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full">
            {renderSubmitButton()}
          </div>
        </div>
      );

    case 'fill_blank':
      return (
        <div className="w-full flex flex-col h-full relative pb-16">
          {activity.question && (
            <h3 className="text-[2rem] lg:text-[2.5rem] font-extrabold text-[#7b5cda] mb-2 text-center leading-tight px-4 tracking-wide" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              {activity.question}
            </h3>
          )}
          {activity.instruction && (
            <p className="text-[1.3rem] lg:text-[1.5rem] font-bold text-[#e74c3c] mb-6 text-center" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {activity.instruction}
            </p>
          )}

          <div className="flex-1 overflow-y-auto custom-scrollbar w-full mb-4 px-4 lg:px-20 pb-20">
            <div className="flex flex-wrap items-center justify-start gap-y-3 gap-x-2 w-full" style={{ alignContent: 'flex-start' }}>
              {activity.sentence_parts?.map((part, index) => {
                if (part.is_break) {
                  return <div key={index} className="basis-full h-0"></div>;
                }
                if (part.is_blank) {
                  const val = blankAnswers[index] || "";
                  let inputStyle = "border-[#2f3542] text-[#e74c3c]";
                  if (isSubmitted) {
                    const correctAns = part.correct_answer || "";
                    if (val.trim().toLowerCase() === correctAns.trim().toLowerCase()) {
                      inputStyle = "border-[#2ecc71] text-[#2ecc71]";
                    } else {
                      inputStyle = "border-[#e74c3c] text-[#e74c3c]";
                    }
                  }

                  return (
                    <div key={index} className="flex flex-col items-center">
                      <input
                        type="text"
                        value={val}
                        disabled={isSubmitted}
                        onChange={(e) => handleBlankChange(index, e.target.value)}
                        className={`w-20 md:w-28 lg:w-32 border-b-4 outline-none text-center text-[1.4rem] lg:text-[1.6rem] font-bold bg-transparent mx-1 focus:border-[#7b5cda] transition-colors ${inputStyle}`}
                        style={{ fontFamily: "'Nunito', sans-serif" }}
                      />
                      {isSubmitted && val.trim().toLowerCase() !== (part.correct_answer || "").toLowerCase() && (
                        <span className="text-[1rem] font-bold text-[#2ecc71] mt-1">{part.correct_answer}</span>
                      )}
                    </div>
                  )
                }
                return <span key={index} className="text-[1.4rem] lg:text-[1.6rem] font-bold text-[#2f3542] whitespace-pre" style={{ fontFamily: "'Nunito', sans-serif" }}>{part.text}</span>;
              })}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full">
            {renderSubmitButton()}
          </div>
        </div>
      );

    case 'matching':
      return (
        <div className="w-full flex flex-col h-full relative pb-16">
          {activity.question && (
            <h3 className="text-[1.6rem] lg:text-[1.8rem] font-extrabold text-[#7b5cda] mb-6 text-center leading-tight px-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {activity.question}
            </h3>
          )}
          <div className="flex-1 overflow-y-auto custom-scrollbar w-full mb-4 pb-20 px-2 lg:px-6">
            <div className="flex flex-row gap-6 w-full min-h-[260px]">
              {/* Left Column */}
              <div className="flex-1 flex flex-col justify-around gap-4">
                {activity.left_col?.map((item) => {
                  const isSelected = matchingState.selectedLeft === item.id;
                  const matchedRightId = matchingState.pairs[item.id];

                  let bgColor = isSelected ? "#ffeaa7" : "#f1f2f6";
                  let textColor = "#2f3542";
                  let borderColor = isSelected ? '#f39c12' : 'transparent';

                  if (matchedRightId) {
                    const rightIdx = activity.right_col.findIndex(r => r.id === matchedRightId);
                    bgColor = matchingColors[rightIdx % matchingColors.length];
                    textColor = "#fff";
                  }

                  if (isSubmitted) {
                    if (matchedRightId === item.match_id) {
                      borderColor = "#2ecc71"; // correct
                    } else if (matchedRightId) {
                      borderColor = "#e74c3c"; // incorrect
                      bgColor = "#ffb8b8";
                      textColor = "#2f3542";
                    } else {
                      borderColor = "#e74c3c"; // missing
                    }
                  }

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleMatchingLeft(item.id)}
                      className={`w-full text-center p-3 rounded-2xl transition-all font-bold text-[1.1rem] lg:text-[1.3rem] shadow-sm border-4 flex items-center justify-center ${isSubmitted ? 'cursor-default' : 'cursor-pointer hover:scale-105'}`}
                      style={{ backgroundColor: bgColor, color: textColor, borderColor: borderColor, fontFamily: "'Nunito', sans-serif", minHeight: '60px' }}
                    >
                      {item.text}
                    </div>
                  )
                })}
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col justify-around gap-4">
                {activity.right_col?.map((item, idx) => {
                  const matchedLeftId = Object.keys(matchingState.pairs).find(key => matchingState.pairs[key] === item.id);
                  let bgColor = "#f1f2f6";
                  let textColor = "#2f3542";
                  let borderClass = "border-dashed border-[#bdc3c7]";
                  let borderColor = "";

                  if (matchedLeftId) {
                    bgColor = matchingColors[idx % matchingColors.length];
                    textColor = "#fff";
                    borderClass = "border-solid border-4";
                    borderColor = "transparent";
                  }

                  if (isSubmitted) {
                    const correctLeft = activity.left_col.find(l => l.match_id === item.id);
                    if (matchedLeftId === correctLeft?.id) {
                      borderColor = "#2ecc71";
                    } else if (matchedLeftId) {
                      borderColor = "#e74c3c";
                      bgColor = "#ffb8b8";
                      textColor = "#2f3542";
                    } else {
                      borderColor = "#e74c3c";
                    }
                  }

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleMatchingRight(item.id)}
                      className={`w-full text-center p-3 rounded-2xl transition-all font-bold text-[1.1rem] lg:text-[1.3rem] shadow-sm flex items-center justify-center ${borderClass} ${isSubmitted ? 'cursor-default' : 'cursor-pointer hover:scale-105'}`}
                      style={{ backgroundColor: bgColor, color: textColor, borderColor: borderColor, fontFamily: "'Nunito', sans-serif", minHeight: '60px' }}
                    >
                      {item.text}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full">
            {renderSubmitButton()}
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
          Activity type "{activity.type}" is not yet implemented.
        </div>
      );
  }
}
