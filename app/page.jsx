const WORDS = [
  "LUMEN",
  "VANTA",
  "FLUX",
  "DREAM",
  "PIXEL",
  "SHADER",
  "CHROME",
  "GLOW",
  "MOTION",
  "HYPER",
  "VOID",
  "NOISE",
  "GLASS",
  "BLOOM",
  "STATIC",
  "ECHO",
  "FRAME",
  "WAVE",
  "SIGNAL",
  "RIFT",
  "FOCUS",
  "ORBIT",
  "PULSE",
  "BLUR"
];

const COLUMNS = 13;
const WORDS_PER_COLUMN = 10;

function trim(value, digits = 2) {
  return Number(value.toFixed(digits));
}

function random(seed) {
  const value = Math.sin(seed * 9301 + 49297) * 233280;
  return value - Math.floor(value);
}

function pickWord(column, index) {
  const wordIndex = Math.floor(random(column * 41 + index * 19) * WORDS.length);
  return WORDS[wordIndex];
}

function buildColumn(column) {
  return Array.from({ length: WORDS_PER_COLUMN }, (_, index) => {
    const seed = column * 100 + index;
    return {
      id: `${column}-${index}`,
      word: pickWord(column, index),
      size: trim(30 + random(seed + 1) * 46),
      width: trim(0.82 + random(seed + 2) * 0.34, 3),
      blur: random(seed + 3) > 0.68 ? 1 : 0,
      opacity: trim(0.38 + random(seed + 4) * 0.58, 3),
      tilt: trim(-5 + random(seed + 5) * 10),
      drift: trim(-28 + random(seed + 6) * 56),
      gap: trim(32 + random(seed + 7) * 74),
      variant: Math.floor(random(seed + 8) * 4)
    };
  });
}

const columns = Array.from({ length: COLUMNS }, (_, index) => ({
  id: index,
  left: `${trim((index / (COLUMNS - 1)) * 100)}%`,
  delay: `${trim(-random(index + 11) * 18)}s`,
  duration: `${trim(19 + random(index + 23) * 17)}s`,
  scale: trim(0.76 + random(index + 37) * 0.72, 3),
  words: buildColumn(index)
}));

function WordImage({ item }) {
  const style = {
    "--fs": `${item.size}px`,
    "--op": item.opacity,
    "--sx": item.width,
    "--blur": `${item.blur}px`,
    "--rot": `${item.tilt}deg`,
    "--x": `${item.drift}px`,
    "--gap": `${item.gap}px`
  };

  return (
    <span className={`wordImage variant-${item.variant}`} data-word={item.word} style={style}>
      {item.word}
      <i className="drop" />
    </span>
  );
}

export default function Home() {
  return (
    <main className="effectPage" aria-label="Infinite falling random word effect">
      <div className="grain" />
      <section className="wordStage" aria-hidden="true">
        <div className="scanline" />
        <div className="vignette" />
        {columns.map((column) => {
          const repeatedWords = [...column.words, ...column.words];
          return (
            <div
              className="wordColumn"
              key={column.id}
              style={{
                "--l": column.left,
                "--d": column.delay,
                "--dur": column.duration,
                "--cs": column.scale
              }}
            >
              {repeatedWords.map((item, index) => (
                <WordImage item={item} key={`${item.id}-${index}`} />
              ))}
            </div>
          );
        })}
      </section>
    </main>
  );
}
