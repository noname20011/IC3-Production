import Select from "@/components/core/Select";
import { ConfettiSideCannons } from "@/components/UI/ConfettieEffect";
import PodiumCard from "@/components/UI/leader_board/PodiumCard";
import Loading from "@/components/UI/Loading";
import { MOCK_LEADERBOARD } from "@/data/mockData";
import { useFetchData } from "@/hooks/useBaseQuery";
import { useStompSubscription } from "@/hooks/useStompSubscription";
import { levelService, partService } from "@/services";
import leaderboardService from "@/services/leaderboardService";
import { convertTime } from "@/utils/convertTime";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Clipboard,
  FileStack,
  Gift,
  Minus,
  Trophy
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export interface LeaderBoard {
  id: string;
  class_name: string;
  level_name?: string;
  part_name?: string;
  school_name: string;
  score: number;
  studentName: string;
  time_spent: number;
  rank?: number;
}

interface FilterFetchData {
  levelId: string | number;
  levelName: string,
  partId: string | number;
  partName: string;
}

/* ─── Trend icon based on value ─────────────────────────────── */
function TrendIcon({ trend }: { trend: string | number }) {
  const val = typeof trend === "string" ? parseInt(trend) : trend;
  if (val > 0) return <ChevronUp size={12} className="text-emerald-400" />;
  if (val < 0) return <ChevronDown size={12} className="text-red-400" />;
  return <Minus size={10} className="text-[#4a3d2e]" />;
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function Leaderboard() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [ranks, setRanks] = useState<LeaderBoard[]>([
    {
      id: "",
      class_name: "",
      level_name: "",
      part_name: "",
      school_name: "",
      score: 0,
      studentName: "",
      time_spent: 0,
      rank: 0,
    },
  ]);
  const [searchParams] = useSearchParams();

  const partId = searchParams.get("partId");
  const classId = searchParams.get("classId");

  const [filterFetch, setFilterFetch] = useState<FilterFetchData>({
    levelId: "",
    levelName: "",
    partId: partId || "",
    partName: "",
  });

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isSelectOpenPart, setIsSelectOpenPart] = useState(false);

  const shouldFetch = !!classId && !!filterFetch.partId;

  const { data, isLoading } = useFetchData<any>(
    ["leaderboard-by-class-and-part", classId, filterFetch.partId],
    () =>
      leaderboardService.getLeaderboardByClassAndPart(
        classId!,
        filterFetch.partId!,
      ),
    {
      enabled: shouldFetch,
    },
  );

  // Call API Level
  const { data: levels, isLoading: isLoadingLevel } = useFetchData<any>(
    ["levels"],
    () => levelService.getAll(),
  );

  // Call API Level
  const { data: parts, isLoading: isLoadingParts } = useFetchData<any>(
    ["part", filterFetch.levelId],
    () => partService.getPartsByLevel(filterFetch.levelId),
    {enabled: !!filterFetch.levelId}
  );

  // Call API Level
  const { data: topByPart, isLoading: isLoadingTopByPart } = useFetchData<any>(
    ["leaderboard-by-part", filterFetch.levelId, filterFetch.partId],
    () => leaderboardService.getLeaderboardByPart(filterFetch.partId),
    {enabled: !!filterFetch.levelId && !!filterFetch.partId}
  );

  useEffect(() => {
    if (!!filterFetch.levelId || !!filterFetch.partId) {
      setRanks([]);
      return;
    }

    if (topByPart?.data) {
      setRanks(topByPart.data);
    }
  }, [filterFetch.levelId, filterFetch.partId, topByPart]);

  useEffect(() => {
    if (!shouldFetch) {
      setRanks(MOCK_LEADERBOARD);
      return;
    }

    if (data?.data) {
      setRanks(data.data);
    }
  }, [shouldFetch, data]);

  // Socket
  useStompSubscription<LeaderBoard[]>(
    `/topic/leaderboard/${classId}/${filterFetch.partId}`,
    (data) => {
      setRanks(data); // Trigger Flip Animation ngay khi có data mới
    },
    {
      enabled: filterFetch.levelId === "",
    },
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Leaderboard
              </h1>
              <p className="text-muted-foreground text-sm">
                Top elite students
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Level select */}
            <Select
              key={"levels"}
              label="Level"
              heightOption="xl:max-h-60 max-h-44"
              placeholder="Choose level"
              data={levels?.data || []}
              value={filterFetch.levelId}
              isOpen={isSelectOpen}
              setIsOpen={setIsSelectOpen}
              isLoading={isLoadingLevel}
              icon={<FileStack size={18} />}
              onChange={(level) => {
                setFilterFetch({
                  ...filterFetch,
                  levelId: level.id,
                  levelName: level.name
                });
              }}
            />

            {/* Part select */}
            <Select
              key={"parts"}
              label="Part"
              placeholder="Choose part"
              heightOption="xl:max-h-60 max-h-44"
              data={parts?.data || []}
              value={filterFetch.partId}
              isLoading={isLoadingParts}
              isOpen={isSelectOpenPart}
              setIsOpen={setIsSelectOpenPart}
              icon={<Clipboard size={18} />}
              onChange={(part) => {
                setFilterFetch({
                  ...filterFetch,
                  partId: part.id,
                  partName: part.name
                });
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* ── Top 3 Podium ── */}
        {ranks && ranks.length > 0 && (
          <div className="mb-10">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">
              🏆 Top 3 the most outstanding students
            </p>
            {/* Cards: 2nd | 1st | 3rd  — 1st is taller and centered */}
            <div className="grid grid-cols-3 items-end gap-3 sm:gap-5 justify-center md:px-10">
              {ranks.length >= 3 && (
                <>
                  <PodiumCard entry={ranks[1]} rank={2} delay={0.15} />
                  <PodiumCard entry={ranks[0]} rank={1} delay={0} />
                  <PodiumCard entry={ranks[2]} rank={3} delay={0.3} />
                </>
              )}
              {ranks && ranks.length === 2 && (
                <>
                  <PodiumCard entry={ranks[1]} rank={2} delay={0.15} />
                  <PodiumCard entry={ranks[0]} rank={1} delay={0} />
                </>
              )}
              {ranks.length === 1 && (
                <>
                  <div className=""></div>
                  <PodiumCard entry={ranks[0]} rank={1} delay={0} />
                  <div className=""></div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── Full Rankings ── */}
        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground text-sm">
              {`Top 20 Leaderboard:  ${filterFetch.levelName} - ${filterFetch.partName}`}
            </h3>
            <span className="text-xs text-muted-foreground">
              {
                Array.from(
                  new Map(ranks.map((item) => [item.studentName, item])),
                ).length
              }{" "}
              students
            </span>
          </div>
          {isLoading || isLoadingTopByPart ? (
            <Loading />
          ) : ranks.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Trophy className="w-10 h-10 mx-auto mb-3 opacity-40" />
              No results yet
            </div>
          ) : (
            <div className="divide-y divide-border">
              <AnimatePresence>
                {ranks.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    className={`flex items-center gap-4 px-4 py-3 hover:bg-muted/30 transition-colors ${index < 3 ? "bg-primary/5" : ""}`}
                    data-testid={`row-leaderboard-${entry.id}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        index === 0
                          ? "bg-yellow-400/20 text-yellow-400"
                          : index === 1
                            ? "bg-slate-400/20 text-slate-300"
                            : index === 2
                              ? "bg-orange-600/20 text-orange-400"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-72">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground text-sm truncate">
                          {entry.studentName}
                        </p>
                        {entry.class_name && (
                          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded flex-shrink-0">
                            {entry.class_name}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {entry.school_name}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 flex items-baseline gap-4">
                      <Trophy size={11} className="text-[#c8a46e]" />
                      <p className="font-bold text-foreground text-sm">
                        {entry.score}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {convertTime(entry.time_spent)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 mr-1">
                      <TrendIcon trend={"2"} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
      {/* Confetti Surprise Button */}
      <motion.button
        onClick={() => {
          setShowConfetti(true);
          // optional: tự tắt sau 5s
          setTimeout(() => setShowConfetti(false), 1000);
        }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1, rotate: 12 }}
        whileTap={{ scale: 0.9 }}
        className="pointer-events-auto group fixed bottom-[30%] right-4 md:right-10 flex items-center mb-2"
      >
        <div className="mr-3 px-4 py-2 bg-primary text-surface font-black text-[10px] uppercase tracking-widest rounded-xl group-hover:opacity-0 opacity-100 transition-opacity duration-300 shadow-xl">
          Nhấn vào đây!
        </div>
        <div className="w-20 h-20 bg-white/10 backdrop-blur-md text-primary rounded-full flex items-center justify-center border border-primary/30 shadow-[0_0_20px_rgba(217,255,0,0.1)] hover:text-white hover:text-surface transition-colors cursor-pointer">
        <motion.div
            animate={{ 
              scale: [1, 2],
              opacity: [0.5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 bg-primary/30 rounded-full -z-10"
          />
          <Gift size={40} />
        </div>
      </motion.button>
      {showConfetti && <ConfettiSideCannons />}
    </div>
  );
}
