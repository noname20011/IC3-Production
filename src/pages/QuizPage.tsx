import { Button } from "@/components/core/buttons/Button";
import { AlertCircle, AlignLeft, Flag } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUp from "../components/core/popups/PopUp";
import HeaderNavQuestion from "../components/UI/quizz/HeaderNavQuestion";
import QuestionListDrawer from "../components/UI/quizz/QuestionListDrawer";
import {
  DragMatchType,
  HotSpotType,
  MultipleType,
  ReorderType,
  SingleType,
  TrueFalseType,
} from "../components/UI/quizz/TypeQuestionTest";
import TestReviewScreen from "../components/UI/Review/TestViewScreen";
import questionsData from "../data/questions.json";
import { useCustomContext } from "../hooks/use-context";
import {
  AnswerMap,
  AnswerValue,
  HotspotAnswer,
  MatchAnswer,
  MultipleAnswer,
  ReorderAnswer,
} from "../types/answer";
import {
  HotSpotEntity,
  MatchEntity,
  MultipleChoiceEntity,
  QuestionType,
  QuestionTypeEntity,
  SingleChoiceEntity,
  SortEntity,
  TrueFalseEntity,
  typeColors,
  typeLabels,
} from "../types/questions";

// ─── Main Quiz component ───────────────────────────────────────────────────────

export default function Quiz() {
  // get saved state from localStorage
  const saved = JSON.parse(localStorage.getItem("quiz_state") || "{}");

  const [current, setCurrent] = useState<number>(saved.current || 0);
  const [flagged, setFlagged] = useState<Set<number>>(
    new Set(saved.flagged || []),
  );
  const [submitted, setSubmitted] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [answers, setAnswers] = useState<AnswerMap>(saved.answers || {});
  const [zoomOutImage, setZoomOutImage] = useState(false);

  const { showList, setShowList, setCompleteQuiz } = useCustomContext();


  // Get questions data by partId
  const { partId } = useParams();
  const navigate = useNavigate();

  const questions: QuestionTypeEntity[] = JSON.parse(sessionStorage.getItem("uiQuestions") || "[]") || questionsData.find(
    (q) => q.partId === partId,
  )?.questions;

  const questionsRaw: QuestionTypeEntity[] = JSON.parse(sessionStorage.getItem("rawTest") || "[]");
  
  const q = questions[current];
  const answered = Object.keys(answers).length;
  const isFlagged = flagged.has(q.id);
  
  // Check if submit auto redirect /
  useEffect(() => {
  const student = localStorage.getItem("student");
  if (student === null || student === "") {
    navigate("/level");
  }
}, [navigate]);


  useEffect(() => {
    localStorage.setItem(
      "quiz_state",
      JSON.stringify({
        answers,
        flagged: Array.from(flagged),
        current,
      }),
    );
  }, [answers, flagged, current]);

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(q.id) ? next.delete(q.id) : next.add(q.id);
      return next;
    });
  };

  const setAnswer = (id: number, val: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const { timeCountDown } = useCustomContext();
  
  useEffect(() => {
    const id = setTimeout(() => {
      if (timeCountDown === 0) {
        const timedDoTest = JSON.parse(localStorage.getItem("timeDoTest") || "{}")?.timeSuspend || 0;
        localStorage.setItem("timedDoTest", timedDoTest);
        setSubmitted(true);
      }}, 2000);
    return () => clearTimeout(id);
  }, [timeCountDown]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (submitted) {
        const timedDoTest = JSON.parse(localStorage.getItem("timeDoTest") || "{}")?.timeSuspend || 0;
        localStorage.setItem("timedDoTest", timedDoTest);
        setReviewing(true);
      }}, 2000);
    return () => clearTimeout(id);
  }, [submitted]);

  // ─── Test Review Screen ────────────────────────────────────────────────────────
  if (submitted && reviewing) {
    return (
      <TestReviewScreen
        questions={questionsRaw}
        answers={answers}
        flagged={flagged}
        onClose={() => setReviewing(false)}
        partId={partId || ""}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[#13100d]">
      <main className="flex-1 min-w-0 flex flex-col">
        {/* ── Sticky header ── */}
        <header className="sticky top-16 z-[11] bg-[#13100d]/95 backdrop-blur-md border-b border-[#2a231a]">
          {/* ── Sticky bottom navigation ── */}
          <HeaderNavQuestion
            questions={questions}
            flagged={flagged}
            current={current}
            setCurrent={setCurrent}
            submitted={submitted}
            setSubmitted={setSubmitted}
            answers={answers}
          />
        </header>
        {/* ── Question body (scrollable) ── */}
        <div id="question" className="flex-1 overflow-y-auto pt-6">
          <div className="px-6 lg:px-8 py-6 max-w-4xl mx-auto w-full">
            {/* Question header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 flex-wrap">
                {/* Type badge */}
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-[11px] font-semibold uppercase tracking-widest ${typeColors[q.type as QuestionType]}`}
                >
                  {typeLabels[q.type as QuestionType]}
                </span>
                {/* Question number */}
                <span className="text-xs text-[#5a4e3a] font-medium">
                  Question {current + 1}{" "}
                  <span className="text-[#3a3020]">/ {questions.length}</span>
                </span>
                {/* Points */}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#2a2418] rounded-md text-xs text-[#c8a46e] font-semibold">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M5 1l.9 1.8 2 .3-1.45 1.4.34 2L5 5.6l-1.79 1 .34-2L2.1 3.1l2-.3z"
                      fill="#c8a46e"
                    />
                  </svg>
                  {q.points ?? 10} pts
                </span>
                {isFlagged && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-400/10 border border-orange-400/20 rounded-md text-xs text-orange-400 font-medium">
                    <Flag size={9} /> Flagged
                  </span>
                )}
              </div>
              {/* Flag button */}
              <button
                onClick={toggleFlag}
                title={isFlagged ? "Remove flag" : "Flag for review"}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all shrink-0 ${
                  isFlagged
                    ? "bg-orange-400/15 border-orange-400/30 text-orange-400 hover:bg-orange-400/20"
                    : "bg-[#1e1810] border-[#2e2418] text-[#5a4e3a] hover:text-[#9a8668] hover:border-[#3e3020]"
                }`}
              >
                <Flag
                  size={13}
                  className={isFlagged ? "fill-orange-400" : ""}
                />
                <span className="hidden sm:inline">
                  {isFlagged ? "Flagged" : "Flag"}
                </span>
              </button>
            </div>

            {/* Question text */}
            <div className="mb-6 p-5 bg-[#1a1510] border border-[#2e2418] rounded-2xl">
              <p className="text-base sm:text-lg font-semibold text-[#b1ada4] leading-relaxed">
                {q.text}
              </p>
              {q.type.toLowerCase()!== 'hotspot' && q.imageUrl && <div className="flex items-end gap-4">
                  <img src={q.imageUrl} alt="Question" className="mt-4 rounded-lg max-h-28 object-contain w-auto" loading="lazy"/>
                <Button className="inline-block text-[#fafafa] bg-devotion-gold text-sm"
                  onClick={() => setZoomOutImage(true)}
                >
                  Zoom out image
                </Button>
                {zoomOutImage && (
                  <PopUp
                    showPopup={zoomOutImage}
                    setShowPopup={setZoomOutImage}
                    className="!p-0 md:!p-0 lg:!p-0 !space-y-0 md:!space-y-0 lg:!max-w-3xl"
                  >
                    <img src={q.imageUrl} alt="Question" className="rounded-lg max-h-[180vh] w-full object-contain" loading="lazy" />
                  </PopUp>
                )}
              </div> 
              }
            </div>

            {/* Question body */}
            {q.type.toLowerCase() === "single" && (
              <SingleType
                key={q.id}
                question={q as SingleChoiceEntity}
                value={(answers as Record<number, number>)[q.id]}
                onChange={(v) => setAnswer(q.id, v)}
              />
            )}
            {q.type.toLowerCase() === "multiple" && (
              <MultipleType
                key={q.id}
                q={q as MultipleChoiceEntity}
                value={answers[q.id] as MultipleAnswer}
                onChange={(v) => setAnswer(q.id, v)}
              />
            )}
            {q.type.toLowerCase() === "truefalse" && (
              <TrueFalseType
                key={q.id}
                q={q as TrueFalseEntity}
                value={
                  (answers as Record<number, Record<number, "true" | "false">>)[
                    q.id
                  ]
                }
                onChange={(v) => setAnswer(q.id, v)}
              />
            )}
            {q.type.toLowerCase() === "reorder" && (
              <ReorderType
                key={q.id}
                q={q as SortEntity}
                value={answers[q.id] as ReorderAnswer}
                onChange={(v) => setAnswer(q.id, v)}
              />
            )}
            {q.type.toLowerCase() === "match" && (
              <DragMatchType
                key={q.id}
                q={q as MatchEntity}
                value={answers[q.id] as MatchAnswer}
                onChange={(v) => setAnswer(q.id, v)}
              />
            )}
            {q.type.toLowerCase() === "hotspot" && (
              <HotSpotType
                key={q.id}
                q={q as HotSpotEntity}
                value={
                  (answers as Record<number, HotspotAnswer | null>)[
                    q.id
                  ]
                }
                onChange={(v) => setAnswer(q.id, v)}
              />
            )}

            {/* Spacer so content clears the bottom nav */}
          </div>
        </div>
      </main>

      {/* Question List Drawer */}
      <QuestionListDrawer
        open={showList}
        onClose={() => setShowList(false)}
        questions={questions}
        current={current}
        flagged={flagged}
        answers={answers}
        onNavigate={(i) => setCurrent(i)}
      />

      {/* PopUp submit Test */}
      {submitted && (
        <PopUp showPopup={submitted} setShowPopup={setSubmitted}>
          <div className="flex">
            <main className="flex-1 flex items-center justify-center p-4">
              <div className="max-w-md w-full text-center">
                {/* Icon */}
                <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle
                    size={80}
                    className="text-[#c8a46e] font-light"
                  />
                </div>

                <h2 className="text-2xl font-bold text-white mb-1">
                  {timeCountDown === 0 ? "Time Out!" : "Are sure you wanna submit?"}
                </h2>
                <p className="text-sm text-[#6b5e4a] mb-7">
                  {answered} of {questions.length} questions answered
                </p>

                {/* 3 stat cards */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="bg-[#1a1510] border border-[#2e2418] rounded-xl p-4">
                    <p className="text-2xl font-bold text-white">{answered}</p>
                    <p className="text-xs text-[#6b5e4a] mt-1">Answered</p>
                  </div>
                  <div className="bg-[#1a1510] border border-[#2e2418] rounded-xl p-4">
                    <p className="text-2xl font-bold text-white">
                      {flagged.size}
                    </p>
                    <p className="text-xs text-[#6b5e4a] mt-1">Flagged</p>
                  </div>
                  <div className="bg-[#1a1510] border border-[#2e2418] rounded-xl p-4">
                    <p className="text-2xl font-bold text-[#c8a46e]">
                      {questions.length - answered}
                    </p>
                    <p className="text-xs text-[#6b5e4a] mt-1">Unanswered</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      const timedDoTest = JSON.parse(localStorage.getItem("timeDoTest") || "{}")?.timeSuspend || 0;
                      localStorage.setItem("timedDoTest", timedDoTest);
                      setReviewing(true);
                      setCompleteQuiz(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#c8a46e] text-lg  font-semibold text-[#13100d] rounded-xl hover:bg-[#d4b47e] transition-all shadow-lg shadow-[#c8a46e]/20"
                  >
                    <AlignLeft size={16} />
                    Submit
                  </button>
                </div>
              </div>
            </main>
          </div>
        </PopUp>
      )}
    </div>
  );
}
