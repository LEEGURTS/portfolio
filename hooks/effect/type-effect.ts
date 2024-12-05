import { useCallback, useEffect, useState } from "react";

interface TypeEffectProps {
  texts: string[];
  typeDelay?: number;
  deleteDelay?: number;
  endDelay?: number;
}

const useTypeEffect = ({
  texts,
  typeDelay = 60,
  deleteDelay = 40,
  endDelay = 1000,
}: TypeEffectProps) => {
  const [displayText, setDisplayText] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const addDisplayText = useCallback(
    () => setDisplayText((prev) => prev + texts[textIdx][prev.length]),
    [texts, textIdx]
  );

  const removeDisplayText = useCallback(() => {
    setDisplayText((prev) => prev.slice(0, prev.length - 1));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isDeleting && displayText.length < texts[textIdx].length) {
      timer = setTimeout(addDisplayText, typeDelay);
    } else if (isDeleting && displayText.length > 0) {
      timer = setTimeout(removeDisplayText, deleteDelay);
    } else if (isDeleting) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setTextIdx((prev) => (prev + 1) % texts.length);
      }, endDelay);
    } else {
      timer = setTimeout(() => setIsDeleting(true), endDelay);
    }

    return () => clearTimeout(timer);
  }, [
    texts,
    isDeleting,
    displayText,
    textIdx,
    addDisplayText,
    removeDisplayText,
    deleteDelay,
    endDelay,
    typeDelay,
  ]);

  return displayText;
};

export default useTypeEffect;
