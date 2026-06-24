import { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  Check,
  X,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Image as ImageIcon,
  MapPin,
  ToggleLeft,
  List,
  Layers,
  Hash,
  ArrowUpDown,
  LayoutGrid,
  Move,
  Maximize2,
} from "lucide-react";
import {
  Question,
  SingleQuestion,
  MultipleQuestion,
  TrueFalseQuestion,
  ReorderQuestion,
  MatchQuestion,
  HotspotQuestion,
  MultiColQuestion,
  TYPE_LABELS,
  TYPE_COLORS,
  getQuestionsForPart,
} from "@/data/question.ts";
import { partsByLevel, levels } from "@/data/mockData";
import AdminSidebar from "@/components/UI/admin/AdminSideBar";

// ─── helpers ──────────────────────────────────────────────────────────────────
const allParts = Object.values(partsByLevel).flat();
const COL_COLORS = [
  "#4ade80",
  "#60a5fa",
  "#f472b6",
  "#fb923c",
  "#c084fc",
  "#fbbf24",
  "#38bdf8",
];

function TypeBadge({ type, small }: { type: string; small?: boolean }) {
  const c = TYPE_COLORS[type] ?? "#c8a46e";
  return (
    <span
      className={`inline-flex items-center font-bold rounded ${small ? "text-[9px] px-1.5 py-0.5" : "text-[10px] px-2 py-0.5"}`}
      style={{ color: c, background: `${c}18`, border: `1px solid ${c}30` }}
    >
      {TYPE_LABELS[type] ?? type}
    </span>
  );
}

const TYPE_ICONS: Record<string, React.ElementType> = {
  single: Hash,
  multiple: List,
  truefalse: ToggleLeft,
  reorder: ArrowUpDown,
  match: Layers,
  hotspot: MapPin,
  multicol: LayoutGrid,
};
function typeIcon(type: string) {
  const Icon = TYPE_ICONS[type] ?? Hash;
  return <Icon size={13} style={{ color: TYPE_COLORS[type] }} />;
}

const TYPE_LIST = [
  "single",
  "multiple",
  "truefalse",
  "reorder",
  "match",
  "hotspot",
  "multicol",
];

// ─── blank templates ───────────────────────────────────────────────────────────
function blankQuestion(type: string, id: number): Question {
  switch (type) {
    case "single":
      return {
        id,
        type: "single",
        text: "",
        points: 10,
        options: [
          { id: 1, value: "", isCorrect: true },
          { id: 2, value: "", isCorrect: false },
          { id: 3, value: "", isCorrect: false },
          { id: 4, value: "", isCorrect: false },
        ],
      };
    case "multiple":
      return {
        id,
        type: "multiple",
        text: "",
        points: 15,
        options: [
          { id: 1, value: "", isCorrect: true },
          { id: 2, value: "", isCorrect: false },
          { id: 3, value: "", isCorrect: false },
          { id: 4, value: "", isCorrect: false },
        ],
      };
    case "truefalse":
      return {
        id,
        type: "truefalse",
        text: "",
        points: 10,
        optionsOfTrueFalseType: ["Đúng", "Sai"],
        statements: [
          { id: 1, value: "", isCorrect: true },
          { id: 2, value: "", isCorrect: false },
        ],
      };
    case "reorder":
      return {
        id,
        type: "reorder",
        text: "",
        points: 20,
        options: [
          { id: 1, value: "", orderIndex: 1 },
          { id: 2, value: "", orderIndex: 2 },
          { id: 3, value: "", orderIndex: 3 },
        ],
      };
    case "match":
      return {
        id,
        type: "match",
        text: "",
        points: 20,
        pairs: [
          { left: { value: "" }, right: { value: "" }, isCorrect: true },
          { left: { value: "" }, right: { value: "" }, isCorrect: true },
          { left: { value: "" }, right: { value: "" }, isCorrect: true },
        ],
      };
    case "multicol":
      return {
        id,
        type: "multicol",
        text: "",
        points: 20,
        columns: ["Column A", "Column B", "Column C"],
        rows: [
          { id: 1, value: "", correctColumn: 0 },
          { id: 2, value: "", correctColumn: 1 },
          { id: 3, value: "", correctColumn: 2 },
        ],
      };
    default:
      return {
        id,
        type: "hotspot",
        text: "",
        points: 15,
        imageUrl: "",
        totalRequiredHotSpot: 1,
        hotSpots: [],
      };
  }
}

// ─── Field helpers ─────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold text-[#6b5e4a] uppercase tracking-widest mb-1.5">
      {children}
    </p>
  );
}
function TA({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#13100d] border border-[#2e2418] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#3a3020] outline-none focus:border-[#c8a46e]/40 resize-none"
    />
  );
}
function Inp({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#13100d] border border-[#2e2418] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#3a3020] outline-none focus:border-[#c8a46e]/40"
    />
  );
}
function SmallInp({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="flex-1 bg-[#13100d] border border-[#2a2418] rounded-lg px-3 py-2 text-sm text-white placeholder-[#3a3020] outline-none focus:border-[#c8a46e]/40"
    />
  );
}

// ─── Single / Multiple Editor ──────────────────────────────────────────────────
function ChoiceEditor({
  q,
  setQ,
}: {
  q: SingleQuestion | MultipleQuestion;
  setQ: (q: Question) => void;
}) {
  const isMultiple = q.type === "multiple";
  const toggle = (id: number) => {
    let opts = q.options.map((o) => ({
      ...o,
      isCorrect: isMultiple ? o.isCorrect : false,
    }));
    opts = opts.map((o) =>
      o.id === id ? { ...o, isCorrect: !o.isCorrect } : o,
    );
    if (!isMultiple)
      opts = opts.map((o) => (o.id === id ? { ...o, isCorrect: true } : o));
    setQ({ ...q, options: opts });
  };
  const addOpt = () =>
    setQ({
      ...q,
      options: [...q.options, { id: Date.now(), value: "", isCorrect: false }],
    });
  const rmOpt = (id: number) =>
    setQ({ ...q, options: q.options.filter((o) => o.id !== id) });
  const upVal = (id: number, value: string) =>
    setQ({
      ...q,
      options: q.options.map((o) => (o.id === id ? { ...o, value } : o)),
    });
  return (
    <div className="space-y-2">
      {q.options.map((opt, i) => (
        <div
          key={opt.id}
          className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${opt.isCorrect ? "border-emerald-400/30 bg-emerald-400/5" : "border-[#2e2418] bg-[#13100d]"}`}
        >
          <span className="text-xs text-[#4a3d2e] w-5 text-center font-bold">
            {String.fromCharCode(65 + i)}
          </span>
          <SmallInp
            value={opt.value}
            onChange={(v) => upVal(opt.id, v)}
            placeholder={`Option ${String.fromCharCode(65 + i)}`}
          />
          <button
            onClick={() => toggle(opt.id)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${opt.isCorrect ? "bg-emerald-400/15 border border-emerald-400/30" : "bg-[#2a2418] border border-[#2e2418] hover:border-emerald-400/20"}`}
          >
            <Check
              size={12}
              className={opt.isCorrect ? "text-emerald-400" : "text-[#4a3d2e]"}
            />
          </button>
          <button
            onClick={() => rmOpt(opt.id)}
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 hover:bg-red-400/10 transition-colors"
          >
            <X size={12} className="text-[#4a3d2e]" />
          </button>
        </div>
      ))}
      <button
        onClick={addOpt}
        className="flex items-center gap-2 text-xs text-[#c8a46e] hover:text-[#d4b47e] transition-colors px-1"
      >
        <Plus size={13} /> Add option
      </button>
    </div>
  );
}

// ─── True/False Editor ─────────────────────────────────────────────────────────
function TrueFalseEditor({
  q,
  setQ,
}: {
  q: TrueFalseQuestion;
  setQ: (q: Question) => void;
}) {
  const addSt = () =>
    setQ({
      ...q,
      statements: [
        ...q.statements,
        { id: Date.now(), value: "", isCorrect: true },
      ],
    });
  const rmSt = (id: number) =>
    setQ({ ...q, statements: q.statements.filter((s) => s.id !== id) });
  const upVal = (id: number, value: string) =>
    setQ({
      ...q,
      statements: q.statements.map((s) => (s.id === id ? { ...s, value } : s)),
    });
  const tgl = (id: number, v: boolean) =>
    setQ({
      ...q,
      statements: q.statements.map((s) =>
        s.id === id ? { ...s, isCorrect: v } : s,
      ),
    });
  return (
    <div className="space-y-2.5">
      {q.statements.map((st, i) => (
        <div
          key={st.id}
          className="flex items-center gap-3 p-3 rounded-xl border border-[#2e2418] bg-[#13100d]"
        >
          <span className="text-xs text-[#4a3d2e] w-5 text-center font-bold shrink-0">
            {i + 1}
          </span>
          <SmallInp
            value={st.value}
            onChange={(v) => upVal(st.id, v)}
            placeholder={`Statement ${i + 1}`}
          />
          <div className="flex items-center gap-1 shrink-0">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                onClick={() => tgl(st.id, v)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${st.isCorrect === v ? (v ? "bg-emerald-400/15 border border-emerald-400/30 text-emerald-400" : "bg-red-400/15 border border-red-400/30 text-red-400") : "bg-[#2a2418] border border-[#2a2418] text-[#4a3d2e] hover:text-[#6b5e4a]"}`}
              >
                {v ? "T" : "F"}
              </button>
            ))}
          </div>
          <button
            onClick={() => rmSt(st.id)}
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 hover:bg-red-400/10 transition-colors"
          >
            <X size={12} className="text-[#4a3d2e]" />
          </button>
        </div>
      ))}
      <button
        onClick={addSt}
        className="flex items-center gap-2 text-xs text-[#c8a46e] hover:text-[#d4b47e] transition-colors px-1"
      >
        <Plus size={13} /> Add statement
      </button>
    </div>
  );
}

// ─── Reorder Editor ────────────────────────────────────────────────────────────
function ReorderEditor({
  q,
  setQ,
}: {
  q: ReorderQuestion;
  setQ: (q: Question) => void;
}) {
  const move = (idx: number, dir: -1 | 1) => {
    const items = [...q.options];
    const t = idx + dir;
    if (t < 0 || t >= items.length) return;
    [items[idx], items[t]] = [items[t], items[idx]];
    setQ({
      ...q,
      options: items.map((it, i) => ({ ...it, orderIndex: i + 1 })),
    });
  };
  const upVal = (id: number, v: string) =>
    setQ({
      ...q,
      options: q.options.map((o) => (o.id === id ? { ...o, value: v } : o)),
    });
  const add = () =>
    setQ({
      ...q,
      options: [
        ...q.options,
        { id: Date.now(), value: "", orderIndex: q.options.length + 1 },
      ],
    });
  const rm = (id: number) =>
    setQ({
      ...q,
      options: q.options
        .filter((o) => o.id !== id)
        .map((o, i) => ({ ...o, orderIndex: i + 1 })),
    });
  return (
    <div className="space-y-2">
      {q.options.map((opt, i) => (
        <div
          key={opt.id}
          className="flex items-center gap-3 p-3 rounded-xl border border-[#2e2418] bg-[#13100d]"
        >
          <GripVertical size={14} className="text-[#3a3020] shrink-0" />
          <span className="w-6 h-6 rounded-lg bg-[#c8a46e]/10 border border-[#c8a46e]/20 flex items-center justify-center text-[10px] font-bold text-[#c8a46e] shrink-0">
            {i + 1}
          </span>
          <SmallInp
            value={opt.value}
            onChange={(v) => upVal(opt.id, v)}
            placeholder={`Item ${i + 1}`}
          />
          <div className="flex flex-col gap-0.5 shrink-0">
            <button
              onClick={() => move(i, -1)}
              disabled={i === 0}
              className="p-0.5 rounded hover:bg-[#2a2418] disabled:opacity-30"
            >
              <ChevronUp size={12} className="text-[#6b5e4a]" />
            </button>
            <button
              onClick={() => move(i, 1)}
              disabled={i === q.options.length - 1}
              className="p-0.5 rounded hover:bg-[#2a2418] disabled:opacity-30"
            >
              <ChevronDown size={12} className="text-[#6b5e4a]" />
            </button>
          </div>
          <button
            onClick={() => rm(opt.id)}
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 hover:bg-red-400/10 transition-colors"
          >
            <X size={12} className="text-[#4a3d2e]" />
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="flex items-center gap-2 text-xs text-[#c8a46e] hover:text-[#d4b47e] transition-colors px-1"
      >
        <Plus size={13} /> Add item
      </button>
    </div>
  );
}

// ─── Match Editor ──────────────────────────────────────────────────────────────
function MatchEditor({
  q,
  setQ,
}: {
  q: MatchQuestion;
  setQ: (q: Question) => void;
}) {
  const add = () =>
    setQ({
      ...q,
      pairs: [
        ...q.pairs,
        { left: { value: "" }, right: { value: "" }, isCorrect: true },
      ],
    });
  const rm = (i: number) =>
    setQ({ ...q, pairs: q.pairs.filter((_, idx) => idx !== i) });
  const upL = (i: number, v: string) =>
    setQ({
      ...q,
      pairs: q.pairs.map((p, idx) =>
        idx === i ? { ...p, left: { value: v } } : p,
      ),
    });
  const upR = (i: number, v: string) =>
    setQ({
      ...q,
      pairs: q.pairs.map((p, idx) =>
        idx === i ? { ...p, right: { value: v } } : p,
      ),
    });
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[1fr_auto_1fr_auto] gap-2 text-[10px] font-bold text-[#6b5e4a] uppercase tracking-widest px-1 mb-1">
        <span>Left</span>
        <span />
        <span>Right</span>
        <span />
      </div>
      {q.pairs.map((pair, i) => (
        <div
          key={i}
          className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-2"
        >
          <div className="bg-[#13100d] border border-[#2e2418] rounded-xl px-3 py-2 flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#4a3d2e] w-4 text-center">
              {i + 1}
            </span>
            <input
              type="text"
              value={pair.left.value}
              onChange={(e) => upL(i, e.target.value)}
              placeholder={`Left ${i + 1}`}
              className="flex-1 bg-transparent text-sm text-white placeholder-[#3a3020] outline-none"
            />
          </div>
          <span className="text-[#c8a46e] text-xs font-bold px-1">↔</span>
          <div className="bg-[#13100d] border border-[#2e2418] rounded-xl px-3 py-2">
            <input
              type="text"
              value={pair.right.value}
              onChange={(e) => upR(i, e.target.value)}
              placeholder={`Right ${i + 1}`}
              className="w-full bg-transparent text-sm text-white placeholder-[#3a3020] outline-none"
            />
          </div>
          <button
            onClick={() => rm(i)}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-400/10 transition-colors"
          >
            <X size={12} className="text-[#4a3d2e]" />
          </button>
        </div>
      ))}
      <button
        onClick={add}
        className="flex items-center gap-2 text-xs text-[#c8a46e] hover:text-[#d4b47e] transition-colors px-1"
      >
        <Plus size={13} /> Add pair
      </button>
    </div>
  );
}

// ─── Multi-Column Editor ────────────────────────────────────────────────────────
function MultiColEditor({
  q,
  setQ,
}: {
  q: MultiColQuestion;
  setQ: (q: Question) => void;
}) {
  const addCol = () =>
    setQ({ ...q, columns: [...q.columns, `Column ${q.columns.length + 1}`] });
  const rmCol = (ci: number) => {
    if (q.columns.length <= 2) return;
    const cols = q.columns.filter((_, i) => i !== ci);
    const rows = q.rows.map((r) => ({
      ...r,
      correctColumn:
        r.correctColumn === ci
          ? 0
          : r.correctColumn > ci
            ? r.correctColumn - 1
            : r.correctColumn,
    }));
    setQ({ ...q, columns: cols, rows });
  };
  const upCol = (ci: number, v: string) =>
    setQ({ ...q, columns: q.columns.map((c, i) => (i === ci ? v : c)) });
  const addRow = () =>
    setQ({
      ...q,
      rows: [...q.rows, { id: Date.now(), value: "", correctColumn: 0 }],
    });
  const rmRow = (id: number) =>
    setQ({ ...q, rows: q.rows.filter((r) => r.id !== id) });
  const upRow = (id: number, k: string, v: string | number) =>
    setQ({
      ...q,
      rows: q.rows.map((r) => (r.id === id ? { ...r, [k]: v } : r)),
    });

  return (
    <div className="space-y-6">
      {/* Column headers */}
      <div>
        <Label>Columns (categories)</Label>
        <div className="flex flex-wrap gap-2 mb-1">
          {q.columns.map((col, ci) => (
            <div
              key={ci}
              className="flex items-center gap-1.5 border rounded-xl px-3 py-2 transition-all"
              style={{
                borderColor: `${COL_COLORS[ci % COL_COLORS.length]}35`,
                background: `${COL_COLORS[ci % COL_COLORS.length]}10`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ background: COL_COLORS[ci % COL_COLORS.length] }}
              />
              <input
                value={col}
                onChange={(e) => upCol(ci, e.target.value)}
                placeholder={`Column ${ci + 1}`}
                className="bg-transparent text-sm font-semibold outline-none w-28"
                style={{ color: COL_COLORS[ci % COL_COLORS.length] }}
              />
              {q.columns.length > 2 && (
                <button
                  onClick={() => rmCol(ci)}
                  className="text-[#4a3d2e] hover:text-red-400 transition-colors"
                >
                  <X size={11} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addCol}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-[#2e2418] text-xs text-[#5a4e3a] hover:text-[#c8a46e] hover:border-[#c8a46e]/30 transition-colors"
          >
            <Plus size={13} /> Add column
          </button>
        </div>
      </div>

      {/* Rows */}
      <div>
        <Label>Items — select correct column for each</Label>
        <div className="space-y-2">
          {/* Column header row */}
          <div className="flex items-center gap-2 px-3 mb-1">
            <span className="flex-1 text-[10px] text-[#4a3d2e] font-bold uppercase tracking-wider">
              Item text
            </span>
            {q.columns.map((col, ci) => (
              <span
                key={ci}
                className="w-8 text-center text-[9px] font-bold truncate"
                style={{ color: COL_COLORS[ci % COL_COLORS.length] }}
              >
                {col.slice(0, 4)}
              </span>
            ))}
            <span className="w-7" />
          </div>

          {q.rows.map((row, ri) => (
            <div
              key={row.id}
              className="flex items-center gap-2 bg-[#13100d] border border-[#2e2418] rounded-xl px-3 py-2.5 group hover:border-[#2e2418]/80"
            >
              <span className="text-[10px] text-[#3a3020] font-bold w-4 shrink-0 text-center">
                {ri + 1}
              </span>
              <SmallInp
                value={row.value}
                onChange={(v) => upRow(row.id, "value", v)}
                placeholder={`Item ${ri + 1}`}
              />
              {q.columns.map((_, ci) => {
                const isSelected = row.correctColumn === ci;
                const color = COL_COLORS[ci % COL_COLORS.length];
                return (
                  <button
                    key={ci}
                    onClick={() => upRow(row.id, "correctColumn", ci)}
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-all"
                    style={{
                      borderColor: isSelected ? color : "#2e2418",
                      background: isSelected ? color : "transparent",
                    }}
                    title={q.columns[ci]}
                  >
                    {isSelected && (
                      <Check size={13} className="text-[#13100d]" />
                    )}
                  </button>
                );
              })}
              <button
                onClick={() => rmRow(row.id)}
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all"
              >
                <X size={12} className="text-[#4a3d2e]" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addRow}
          className="flex items-center gap-2 text-xs text-[#c8a46e] hover:text-[#d4b47e] transition-colors mt-2 px-1"
        >
          <Plus size={13} /> Add item
        </button>
      </div>

      {/* Preview grid */}
      <div>
        <Label>Preview table</Label>
        <div className="overflow-x-auto rounded-xl border border-[#2e2418]">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="bg-[#1a1510] px-4 py-2.5 text-left text-[10px] font-bold text-[#5a4e3a] uppercase tracking-wider border-b border-[#2e2418]">
                  Item
                </th>
                {q.columns.map((col, ci) => (
                  <th
                    key={ci}
                    className="bg-[#1a1510] px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider border-b border-[#2e2418] border-l border-[#2e2418]"
                    style={{ color: COL_COLORS[ci % COL_COLORS.length] }}
                  >
                    {col || `Col ${ci + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1810]">
              {q.rows.map((row, ri) => (
                <tr
                  key={row.id}
                  className={ri % 2 === 0 ? "bg-[#13100d]" : "bg-[#111009]"}
                >
                  <td className="px-4 py-2.5 text-sm text-[#a8987a]">
                    {row.value || <em className="text-[#3a3020]">Empty</em>}
                  </td>
                  {q.columns.map((_, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-2.5 text-center border-l border-[#1e1810]"
                      style={{
                        background:
                          row.correctColumn === ci
                            ? `${COL_COLORS[ci % COL_COLORS.length]}12`
                            : undefined,
                      }}
                    >
                      {row.correctColumn === ci && (
                        <Check
                          size={14}
                          className="mx-auto"
                          style={{ color: COL_COLORS[ci % COL_COLORS.length] }}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Interactive Hotspot Canvas ────────────────────────────────────────────────
type HotSpot = {
  label: string;
  top: number;
  left: number;
  width: number;
  height: number;
};

type InteractionMode =
  | { kind: "idle" }
  | {
      kind: "drawing";
      startX: number;
      startY: number;
      curX: number;
      curY: number;
    }
  | {
      kind: "dragging";
      idx: number;
      startX: number;
      startY: number;
      origTop: number;
      origLeft: number;
    }
  | {
      kind: "resizing";
      idx: number;
      handle: string;
      startX: number;
      startY: number;
      origZone: HotSpot;
    };

const HANDLES = ["nw", "n", "ne", "e", "se", "s", "sw", "w"] as const;
const HANDLE_STYLE: Record<
  string,
  { top: string; left: string; cursor: string }
> = {
  nw: { top: "0%", left: "0%", cursor: "nw-resize" },
  n: { top: "0%", left: "50%", cursor: "n-resize" },
  ne: { top: "0%", left: "100%", cursor: "ne-resize" },
  e: { top: "50%", left: "100%", cursor: "e-resize" },
  se: { top: "100%", left: "100%", cursor: "se-resize" },
  s: { top: "100%", left: "50%", cursor: "s-resize" },
  sw: { top: "100%", left: "0%", cursor: "sw-resize" },
  w: { top: "50%", left: "0%", cursor: "w-resize" },
};

function HotspotCanvas({
  hotSpots,
  onChange,
  imageUrl,
}: {
  hotSpots: HotSpot[];
  onChange: (hs: HotSpot[]) => void;
  imageUrl: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const interRef = useRef<InteractionMode>({ kind: "idle" });
  const hotSpotsRef = useRef(hotSpots);
  hotSpotsRef.current = hotSpots;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // drawRect drives the visual "ghost" while drawing
  const [drawRect, setDrawRect] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const [editingLabel, setEditingLabel] = useState<number | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const pct = useCallback((clientX: number, clientY: number) => {
    const rect = containerRef.current!.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)),
      y: Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100)),
    };
  }, []);

  // Global mouse handlers — registered once, use refs to avoid stale closures
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const st = interRef.current;
      if (st.kind === "idle") return;
      const { x, y } = pct(e.clientX, e.clientY);

      if (st.kind === "drawing") {
        interRef.current = { ...st, curX: x, curY: y };
        const rawW = x - st.startX,
          rawH = y - st.startY;
        setDrawRect({
          top: rawH < 0 ? st.startY + rawH : st.startY,
          left: rawW < 0 ? st.startX + rawW : st.startX,
          width: Math.abs(rawW),
          height: Math.abs(rawH),
        });
      } else if (st.kind === "dragging") {
        const dx = x - st.startX,
          dy = y - st.startY;
        const hs = hotSpotsRef.current;
        const zone = hs[st.idx];
        if (!zone) return;
        const updated = hs.map((z, i) =>
          i === st.idx
            ? {
                ...z,
                left: +Math.max(
                  0,
                  Math.min(100 - zone.width, st.origLeft + dx),
                ).toFixed(2),
                top: +Math.max(
                  0,
                  Math.min(100 - zone.height, st.origTop + dy),
                ).toFixed(2),
              }
            : z,
        );
        onChangeRef.current(updated);
      } else if (st.kind === "resizing") {
        const dx = x - st.startX,
          dy = y - st.startY;
        const oz = st.origZone;
        let { top, left, width, height } = oz;
        const h = st.handle;
        if (h.includes("e")) width = Math.max(4, oz.width + dx);
        if (h.includes("s")) height = Math.max(4, oz.height + dy);
        if (h.includes("w")) {
          left = oz.left + dx;
          width = Math.max(4, oz.width - dx);
        }
        if (h.includes("n")) {
          top = oz.top + dy;
          height = Math.max(4, oz.height - dy);
        }
        const updated = hotSpotsRef.current.map((z, i) =>
          i === st.idx
            ? {
                ...z,
                top: +Math.max(0, top).toFixed(2),
                left: +Math.max(0, left).toFixed(2),
                width: +Math.max(4, width).toFixed(2),
                height: +Math.max(4, height).toFixed(2),
              }
            : z,
        );
        onChangeRef.current(updated);
      }
    };

    const onUp = (e: MouseEvent) => {
      const st = interRef.current;
      if (st.kind === "drawing") {
        const rawW = st.curX - st.startX,
          rawH = st.curY - st.startY;
        if (Math.abs(rawW) > 3 && Math.abs(rawH) > 3) {
          const zone: HotSpot = {
            label: `Zone ${hotSpotsRef.current.length + 1}`,
            top: +(rawH < 0 ? st.startY + rawH : st.startY).toFixed(2),
            left: +(rawW < 0 ? st.startX + rawW : st.startX).toFixed(2),
            width: +Math.abs(rawW).toFixed(2),
            height: +Math.abs(rawH).toFixed(2),
          };
          onChangeRef.current([...hotSpotsRef.current, zone]);
          setEditingLabel(hotSpotsRef.current.length);
        }
        setDrawRect(null);
      }
      interRef.current = { kind: "idle" };
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [pct]);

  const startDraw = (e: React.MouseEvent) => {
    e.preventDefault();
    const { x, y } = pct(e.clientX, e.clientY);
    interRef.current = {
      kind: "drawing",
      startX: x,
      startY: y,
      curX: x,
      curY: y,
    };
  };

  const startDrag = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    const hs = hotSpotsRef.current[idx];
    const { x, y } = pct(e.clientX, e.clientY);
    interRef.current = {
      kind: "dragging",
      idx,
      startX: x,
      startY: y,
      origTop: hs.top,
      origLeft: hs.left,
    };
  };

  const startResize = (e: React.MouseEvent, idx: number, handle: string) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = pct(e.clientX, e.clientY);
    interRef.current = {
      kind: "resizing",
      idx,
      handle,
      startX: x,
      startY: y,
      origZone: { ...hotSpotsRef.current[idx] },
    };
  };

  const deleteZone = (idx: number) => {
    onChangeRef.current(hotSpots.filter((_, i) => i !== idx));
    if (editingLabel === idx) setEditingLabel(null);
  };

  const updateLabel = (idx: number, v: string) => {
    onChange(hotSpots.map((z, i) => (i === idx ? { ...z, label: v } : z)));
  };

  return (
    <div className="space-y-4">
      {/* Instruction bar */}
      <div className="flex items-center gap-2.5 bg-[#1a1510] border border-[#c8a46e]/20 rounded-xl px-4 py-2.5">
        <div className="flex items-center gap-2 text-[11px] text-[#6b5e4a]">
          <Maximize2 size={13} className="text-[#c8a46e]" />
          <span>
            <span className="text-[#c8a46e] font-semibold">Drag</span> on the
            image to draw a zone
          </span>
        </div>
        <div className="w-px h-4 bg-[#2e2418]" />
        <div className="flex items-center gap-2 text-[11px] text-[#6b5e4a]">
          <Move size={13} className="text-[#60a5fa]" />
          <span>
            <span className="text-[#60a5fa] font-semibold">Drag zone</span> to
            move • <span className="text-[#f472b6] font-semibold">handles</span>{" "}
            to resize
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="relative select-none rounded-2xl overflow-hidden border border-[#2e2418] bg-[#0a0806]"
        style={{ minHeight: 220, cursor: "crosshair" }}
        onMouseDown={startDraw}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="hotspot"
            className="w-full object-contain pointer-events-none"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(false)}
            draggable={false}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-2 pointer-events-none">
            <ImageIcon size={28} className="text-[#2e2418]" />
            <p className="text-xs text-[#3a3020]">
              Enter image URL below to enable hotspot drawing
            </p>
          </div>
        )}

        {/* Draw ghost */}
        {drawRect && (
          <div
            className="absolute pointer-events-none border-2 border-dashed border-[#c8a46e] rounded-sm"
            style={{
              top: `${drawRect.top}%`,
              left: `${drawRect.left}%`,
              width: `${drawRect.width}%`,
              height: `${drawRect.height}%`,
              background: "#c8a46e14",
            }}
          />
        )}

        {/* Zones */}
        {hotSpots.map((hs, idx) => (
          <div
            key={idx}
            className="absolute group/zone rounded-sm"
            style={{
              top: `${hs.top}%`,
              left: `${hs.left}%`,
              width: `${hs.width}%`,
              height: `${hs.height}%`,
              border: "2px solid #c8a46e",
              background: "#c8a46e12",
              cursor: "move",
              zIndex: 10,
            }}
            onMouseDown={(e) => startDrag(e, idx)}
          >
            {/* Zone label */}
            <div
              className="absolute top-0 left-0 right-0 truncate pointer-events-none"
              style={{ background: "#13100d99" }}
            >
              <span className="text-[8px] font-bold text-[#c8a46e] px-1">
                {hs.label}
              </span>
            </div>

            {/* Delete */}
            <button
              className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-bl flex items-center justify-center opacity-0 group-hover/zone:opacity-100 transition-opacity z-20"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                deleteZone(idx);
              }}
            >
              <X size={8} className="text-white" />
            </button>

            {/* Resize handles */}
            {HANDLES.map((handle) => {
              const hs2 = HANDLE_STYLE[handle];
              return (
                <div
                  key={handle}
                  className="absolute w-2.5 h-2.5 bg-white border-2 border-[#c8a46e] rounded-sm opacity-0 group-hover/zone:opacity-100 transition-opacity z-20 hover:opacity-100"
                  style={{
                    top: hs2.top,
                    left: hs2.left,
                    transform: "translate(-50%,-50%)",
                    cursor: hs2.cursor,
                  }}
                  onMouseDown={(e) => startResize(e, idx, handle)}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Zone list — label editing + coordinates readout */}
      {hotSpots.length > 0 && (
        <div className="space-y-2">
          <Label>Zones ({hotSpots.length}) — click label to rename</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {hotSpots.map((hs, idx) => (
              <div
                key={idx}
                className="bg-[#13100d] border border-[#2e2418] rounded-xl px-3 py-2.5 flex items-center gap-2 group hover:border-[#2e2418]/60"
              >
                <div className="w-5 h-5 rounded bg-[#c8a46e]/10 border border-[#c8a46e]/25 flex items-center justify-center text-[9px] font-bold text-[#c8a46e] shrink-0">
                  {idx + 1}
                </div>
                {editingLabel === idx ? (
                  <input
                    autoFocus
                    value={hs.label}
                    onChange={(e) => updateLabel(idx, e.target.value)}
                    onBlur={() => setEditingLabel(null)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setEditingLabel(null)
                    }
                    className="flex-1 bg-transparent text-xs text-white outline-none border-b border-[#c8a46e]/40"
                  />
                ) : (
                  <button
                    className="flex-1 text-left text-xs text-[#a8987a] hover:text-[#c8a46e] truncate"
                    onClick={() => setEditingLabel(idx)}
                  >
                    {hs.label}
                  </button>
                )}
                <span className="text-[9px] text-[#3a3020] font-mono shrink-0 hidden sm:block">
                  {hs.top.toFixed(1)},{hs.left.toFixed(1)} {hs.width.toFixed(1)}
                  ×{hs.height.toFixed(1)}
                </span>
                <button
                  onClick={() => deleteZone(idx)}
                  className="w-6 h-6 rounded flex items-center justify-center hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  <Trash2 size={11} className="text-[#4a3d2e]" />
                </button>
              </div>
            ))}
          </div>
          {/* JSON preview */}
          <details className="group">
            <summary className="text-[10px] text-[#4a3d2e] cursor-pointer hover:text-[#6b5e4a] transition-colors select-none">
              Show JSON output ▾
            </summary>
            <pre className="mt-2 p-3 bg-[#0a0806] border border-[#1e1810] rounded-xl text-[9px] text-[#5a4e3a] overflow-x-auto font-mono leading-relaxed">
              {JSON.stringify(hotSpots, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
}

// ─── Hotspot Editor ────────────────────────────────────────────────────────────
function HotspotEditor({
  q,
  setQ,
}: {
  q: HotspotQuestion;
  setQ: (q: Question) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Image URL</Label>
        <div className="flex gap-2">
          <Inp
            value={q.imageUrl}
            onChange={(v) => setQ({ ...q, imageUrl: v })}
            placeholder="/assets/question/OT1_q8.png"
          />
        </div>
      </div>
      <div>
        <Label>Required hotspots to select</Label>
        <div className="w-28">
          <Inp
            type="number"
            value={q.totalRequiredHotSpot}
            onChange={(v) => setQ({ ...q, totalRequiredHotSpot: +v })}
            placeholder="1"
          />
        </div>
      </div>
      <div>
        <Label>Draw Hotspot Zones</Label>
        <HotspotCanvas
          imageUrl={q.imageUrl}
          hotSpots={q.hotSpots}
          onChange={(hs) => setQ({ ...q, hotSpots: hs })}
        />
      </div>
    </div>
  );
}

// ─── Viewers ───────────────────────────────────────────────────────────────────
function MultiColViewer({ q }: { q: MultiColQuestion }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#2e2418]">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="bg-[#1a1510] px-4 py-3 text-left text-[10px] font-bold text-[#5a4e3a] uppercase tracking-wider border-b border-[#2e2418]">
              Item
            </th>
            {q.columns.map((col, ci) => (
              <th
                key={ci}
                className="bg-[#1a1510] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-wider border-b border-l border-[#2e2418]"
                style={{ color: COL_COLORS[ci % COL_COLORS.length] }}
              >
                {col || `Col ${ci + 1}`}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1e1810]">
          {q.rows.map((row, ri) => (
            <tr
              key={row.id}
              className={ri % 2 === 0 ? "bg-[#13100d]" : "bg-[#111009]"}
            >
              <td className="px-4 py-2.5 text-sm text-[#a8987a]">
                {row.value || <em className="text-[#3a3020]">Empty</em>}
              </td>
              {q.columns.map((_, ci) => (
                <td
                  key={ci}
                  className="px-4 py-2.5 text-center border-l border-[#1e1810]"
                  style={{
                    background:
                      row.correctColumn === ci
                        ? `${COL_COLORS[ci % COL_COLORS.length]}12`
                        : undefined,
                  }}
                >
                  {row.correctColumn === ci && (
                    <Check
                      size={14}
                      className="mx-auto"
                      style={{ color: COL_COLORS[ci % COL_COLORS.length] }}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function QuestionViewer({ q }: { q: Question }) {
  if (q.type === "single" || q.type === "multiple") {
    return (
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <div
            key={opt.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${opt.isCorrect ? "border-emerald-400/30 bg-emerald-400/5" : "border-[#2e2418] bg-[#13100d]"}`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${opt.isCorrect ? "bg-emerald-400 text-[#13100d]" : "bg-[#2a2418] text-[#4a3d2e]"}`}
            >
              {String.fromCharCode(65 + i)}
            </span>
            <span className="text-sm text-[#a8987a]">
              {opt.value || <em className="text-[#3a3020]">Empty</em>}
            </span>
            {opt.isCorrect && (
              <span className="ml-auto text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                Correct
              </span>
            )}
          </div>
        ))}
      </div>
    );
  }
  if (q.type === "truefalse") {
    return (
      <div className="space-y-2">
        {q.statements.map((st, i) => (
          <div
            key={st.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#2e2418] bg-[#13100d]"
          >
            <span className="w-5 h-5 rounded bg-[#2a2418] flex items-center justify-center text-[10px] font-bold text-[#5a4e3a] shrink-0">
              {i + 1}
            </span>
            <span className="text-sm text-[#a8987a] flex-1">
              {st.value || <em className="text-[#3a3020]">Empty</em>}
            </span>
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-lg shrink-0 ${st.isCorrect ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"}`}
            >
              {st.isCorrect ? "True" : "False"}
            </span>
          </div>
        ))}
      </div>
    );
  }
  if (q.type === "reorder") {
    return (
      <div className="space-y-2">
        {[...q.options]
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((opt) => (
            <div
              key={opt.id}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#2e2418] bg-[#13100d]"
            >
              <span className="w-6 h-6 rounded bg-[#c8a46e]/10 border border-[#c8a46e]/20 flex items-center justify-center text-[10px] font-bold text-[#c8a46e] shrink-0">
                {opt.orderIndex}
              </span>
              <span className="text-sm text-[#a8987a]">
                {opt.value || <em className="text-[#3a3020]">Empty</em>}
              </span>
            </div>
          ))}
      </div>
    );
  }
  if (q.type === "match") {
    return (
      <div className="space-y-2">
        {q.pairs.map((p, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_auto_1fr] items-center gap-3"
          >
            <div className="px-3 py-2.5 rounded-xl border border-[#2e2418] bg-[#13100d] text-sm text-[#a8987a]">
              <span className="text-[10px] font-bold text-[#4a3d2e] mr-2">
                {i + 1}
              </span>
              {p.left.value || <em className="text-[#3a3020]">Empty</em>}
            </div>
            <span className="text-[#c8a46e] text-xs font-bold">↔</span>
            <div className="px-3 py-2.5 rounded-xl border border-[#2e2418] bg-[#13100d] text-sm text-[#a8987a]">
              {p.right.value || <em className="text-[#3a3020]">Empty</em>}
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (q.type === "hotspot") {
    return (
      <div className="space-y-3">
        <div
          className="relative bg-[#13100d] border border-[#2e2418] rounded-xl overflow-hidden"
          style={{ minHeight: 120 }}
        >
          {q.imageUrl ? (
            <img
              src={q.imageUrl}
              alt="hotspot"
              className="w-full object-contain"
            />
          ) : (
            <div className="flex items-center justify-center py-10">
              <ImageIcon size={28} className="text-[#2e2418]" />
            </div>
          )}
          {q.hotSpots.map((hs, i) => (
            <div
              key={i}
              className="absolute border-2 border-[#c8a46e] rounded flex items-start justify-start"
              style={{
                top: `${hs.top}%`,
                left: `${hs.left}%`,
                width: `${hs.width}%`,
                height: `${hs.height}%`,
                background: "#c8a46e15",
              }}
            >
              <span
                className="text-[7px] font-bold text-[#c8a46e] px-0.5 truncate"
                style={{ background: "#13100d80" }}
              >
                {hs.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-[#5a4e3a]">
          <span>
            Required: <b className="text-[#c8a46e]">{q.totalRequiredHotSpot}</b>
          </span>
          <span>
            Zones: <b className="text-[#c8a46e]">{q.hotSpots.length}</b>
          </span>
        </div>
      </div>
    );
  }
  if (q.type === "multicol") {
    return <MultiColViewer q={q} />;
  }
  return null;
}

// ─── Question Editor (dispatch by type) ───────────────────────────────────────
function QuestionEditor({
  q,
  setQ,
}: {
  q: Question;
  setQ: (q: Question) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <Label>Question Text</Label>
        <TA
          value={q.text}
          onChange={(v) => setQ({ ...q, text: v })}
          placeholder="Enter question text…"
          rows={3}
        />
      </div>
      <div>
        <Label>Points</Label>
        <div className="w-28">
          <Inp
            type="number"
            value={q.points}
            onChange={(v) => setQ({ ...q, points: +v })}
          />
        </div>
      </div>
      <div>
        <Label>
          {q.type === "single" && "Answer Options (one correct)"}
          {q.type === "multiple" && "Answer Options (multiple correct)"}
          {q.type === "truefalse" && "Statements"}
          {q.type === "reorder" && "Items (correct order)"}
          {q.type === "match" && "Matching Pairs"}
          {q.type === "hotspot" && "Hotspot Zones"}
          {q.type === "multicol" && "Columns & Items"}
        </Label>
        {(q.type === "single" || q.type === "multiple") && (
          <ChoiceEditor q={q} setQ={setQ} />
        )}
        {q.type === "truefalse" && <TrueFalseEditor q={q} setQ={setQ} />}
        {q.type === "reorder" && <ReorderEditor q={q} setQ={setQ} />}
        {q.type === "match" && <MatchEditor q={q} setQ={setQ} />}
        {q.type === "hotspot" && <HotspotEditor q={q} setQ={setQ} />}
        {q.type === "multicol" && <MultiColEditor q={q} setQ={setQ} />}
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────
interface QuestionManagerProps {
  partId: number;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function QuestionManager({
  partId,
  onBack,
  onNavigate,
}: QuestionManagerProps) {
  const part = allParts.find((p) => p.id === partId);
  const level = levels.find((l) => l.id === part?.levelId);

  const [questions, setQuestions] = useState<Question[]>(() =>
    getQuestionsForPart(partId),
  );
  const [selected, setSelected] = useState<Question | null>(
    questions[0] ?? null,
  );
  const [mode, setMode] = useState<"view" | "edit" | "create">("view");
  const [editDraft, setEditDraft] = useState<Question | null>(null);
  const [createDraft, setCreateDraft] = useState<Question | null>(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [showPicker, setShowPicker] = useState(false);
  const [delConfirm, setDelConfirm] = useState<number | null>(null);

  const filteredQ = questions.filter(
    (q) =>
      (filterType === "all" || q.type === filterType) &&
      q.text.toLowerCase().includes(search.toLowerCase()),
  );

  const startEdit = () => {
    if (!selected) return;
    setEditDraft(JSON.parse(JSON.stringify(selected)));
    setMode("edit");
  };
  const cancelEdit = () => {
    setMode("view");
    setEditDraft(null);
  };
  const saveEdit = () => {
    if (!editDraft) return;
    setQuestions((prev) =>
      prev.map((q) => (q.id === editDraft.id ? editDraft : q)),
    );
    setSelected(editDraft);
    setMode("view");
    setEditDraft(null);
  };

  const startCreate = (type: string) => {
    setCreateDraft(blankQuestion(type, Date.now()));
    setMode("create");
    setShowPicker(false);
  };
  const cancelCreate = () => {
    setMode("view");
    setCreateDraft(null);
  };
  const saveCreate = () => {
    if (!createDraft) return;
    setQuestions((prev) => [...prev, createDraft]);
    setSelected(createDraft);
    setMode("view");
    setCreateDraft(null);
  };

  const deleteQ = (id: number) => {
    setQuestions((prev) => {
      const next = prev.filter((q) => q.id !== id);
      if (selected?.id === id) setSelected(next[0] ?? null);
      return next;
    });
    setDelConfirm(null);
    setMode("view");
  };

  return (
    <div className="flex h-screen bg-[#13100d] overflow-hidden md:ml-[280px]">
      <AdminSidebar active="datamgmt" onNavigate={onNavigate} />

      {/* ── Left: Question List ── */}
      <div className="w-72 xl:w-80 shrink-0 flex flex-col border-r border-[#2a231a] bg-[#0f0d0a]">
        {/* Header */}
        <div className="px-4 pt-5 pb-4 border-b border-[#2a231a]">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-[#5a4e3a] hover:text-[#c8a46e] transition-colors mb-3"
          >
            <ChevronLeft size={13} /> Back to Parts
          </button>
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="min-w-0">
              <p className="text-[11px] text-[#5a4e3a]">
                {level?.name} · {part?.name}
              </p>
              <h2 className="text-sm font-bold text-white truncate">
                {part?.topic}
              </h2>
            </div>
            <span className="text-[10px] font-bold text-[#c8a46e] bg-[#c8a46e]/10 px-2 py-1 rounded-lg shrink-0">
              {questions.length} Q
            </span>
          </div>
          <div className="flex items-center gap-2 bg-[#1a1510] border border-[#2e2418] rounded-xl px-3 py-2 mb-3">
            <Search size={12} className="text-[#4a3d2e] shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="flex-1 bg-transparent text-xs text-white placeholder-[#3a3020] outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {["all", ...TYPE_LIST].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className="px-2 py-0.5 rounded-md text-[10px] font-bold transition-all"
                style={
                  filterType === t && t !== "all"
                    ? {
                        color: TYPE_COLORS[t],
                        background: `${TYPE_COLORS[t]}18`,
                        border: `1px solid ${TYPE_COLORS[t]}35`,
                      }
                    : {}
                }
              >
                <span
                  className={
                    filterType === t && t === "all"
                      ? "text-[#c8a46e]"
                      : filterType !== t
                        ? "text-[#4a3d2e] hover:text-[#6b5e4a]"
                        : ""
                  }
                >
                  {t === "all" ? "All" : TYPE_LABELS[t]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto py-1">
          {filteredQ.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-center px-4">
              <Search size={20} className="text-[#2e2418] mb-2" />
              <p className="text-xs text-[#3a3020]">No questions found</p>
            </div>
          )}
          {filteredQ.map((q, i) => {
            const isActive =
              (mode === "view" || mode === "edit") && selected?.id === q.id;
            return (
              <button
                key={q.id}
                onClick={() => {
                  if (mode === "create") return;
                  setSelected(q);
                  setMode("view");
                  setEditDraft(null);
                }}
                className={`w-full text-left px-4 py-3 border-l-2 transition-all hover:bg-[#1a1510] ${isActive ? "bg-[#1a1510] border-[#c8a46e]" : "border-transparent"}`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">{typeIcon(q.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-medium leading-snug line-clamp-2 ${isActive ? "text-white" : "text-[#8a7a65]"}`}
                    >
                      {q.text || <em className="text-[#3a3020]">No text</em>}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <TypeBadge type={q.type} small />
                      <span className="text-[9px] text-[#4a3d2e]">
                        {q.points} pts
                      </span>
                      <span className="text-[9px] text-[#3a3020] ml-auto">
                        #{i + 1}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Create button */}
        <div className="px-4 py-4 border-t border-[#2a231a] relative">
          <button
            onClick={() => setShowPicker((v) => !v)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#c8a46e] text-sm font-bold text-[#13100d] hover:bg-[#d4b47e] transition-all shadow-lg shadow-[#c8a46e]/20"
          >
            <Plus size={15} /> Create Question
          </button>
          {showPicker && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#1a1510] border border-[#2e2418] rounded-2xl overflow-hidden shadow-2xl z-50">
              <p className="text-[10px] font-bold text-[#5a4e3a] uppercase tracking-widest px-4 py-3 border-b border-[#2a2418]">
                Select type
              </p>
              {TYPE_LIST.map((t) => (
                <button
                  key={t}
                  onClick={() => startCreate(t)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#1e1810] transition-colors"
                >
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${TYPE_COLORS[t]}15` }}
                  >
                    {typeIcon(t)}
                  </div>
                  <span className="text-sm text-[#a8987a]">
                    {TYPE_LABELS[t]}
                  </span>
                  <TypeBadge type={t} small />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 min-w-0 overflow-y-auto flex flex-col">
        {/* Empty state */}
        {mode === "view" && !selected && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
            <div className="w-16 h-16 rounded-2xl bg-[#1a1510] border border-[#2e2418] flex items-center justify-center mb-4">
              <List size={24} className="text-[#3a3020]" />
            </div>
            <p className="text-sm text-[#4a3d2e]">
              Select a question to view details
            </p>
          </div>
        )}

        {/* VIEW */}
        {mode === "view" && selected && (
          <>
            <div className="sticky top-0 z-10 bg-[#13100d]/95 backdrop-blur-sm border-b border-[#2a231a] px-6 lg:px-8 py-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <TypeBadge type={selected.type} />
                  <span className="text-[11px] text-[#4a3d2e]">
                    {selected.points} points
                  </span>
                </div>
                <h2 className="text-sm font-bold text-white line-clamp-1">
                  {selected.text || "Untitled question"}
                </h2>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={startEdit}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e1810] border border-[#2e2418] text-sm font-medium text-[#a8987a] hover:text-white transition-all"
                >
                  <Pencil size={13} /> Edit
                </button>
                <button
                  onClick={() => setDelConfirm(selected.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e1810] border border-[#2e2418] text-sm font-medium text-[#6b5e4a] hover:text-red-400 hover:border-red-400/20 transition-all"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
            <div className="flex-1 px-6 lg:px-8 py-6 max-w-3xl">
              <div className="bg-[#1a1510] border border-[#2e2418] rounded-2xl p-5 mb-5">
                <p className="text-[10px] font-bold text-[#5a4e3a] uppercase tracking-widest mb-2">
                  Question
                </p>
                <p className="text-base text-white font-medium leading-relaxed">
                  {selected.text || (
                    <em className="text-[#3a3020]">No text set</em>
                  )}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#5a4e3a] uppercase tracking-widest mb-3">
                  {selected.type === "single" && "Answer Options"}
                  {selected.type === "multiple" &&
                    "Answer Options (multiple correct)"}
                  {selected.type === "truefalse" && "Statements"}
                  {selected.type === "reorder" && "Correct Order"}
                  {selected.type === "match" && "Matching Pairs"}
                  {selected.type === "hotspot" && "Hotspot Zones"}
                  {selected.type === "multicol" && "Column Classification"}
                </p>
                <QuestionViewer q={selected} />
              </div>
            </div>
            {delConfirm === selected.id && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="bg-[#1a1510] border border-[#2e2418] rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
                  <div className="w-12 h-12 rounded-2xl bg-red-400/10 border border-red-400/20 flex items-center justify-center mb-4">
                    <Trash2 size={20} className="text-red-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Delete question?
                  </h3>
                  <p className="text-sm text-[#5a4e3a] mb-5 line-clamp-2">
                    {selected.text || "Untitled"}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDelConfirm(null)}
                      className="flex-1 py-2.5 rounded-xl border border-[#2e2418] text-sm text-[#6b5e4a]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => deleteQ(selected.id)}
                      className="flex-1 py-2.5 rounded-xl bg-red-500/80 hover:bg-red-500 text-sm font-bold text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* EDIT */}
        {mode === "edit" && editDraft && (
          <>
            <div className="sticky top-0 z-10 bg-[#13100d]/95 backdrop-blur-sm border-b border-[#2a231a] px-6 lg:px-8 py-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#5a4e3a] font-medium mb-0.5">
                  Editing
                </p>
                <div className="flex items-center gap-2">
                  <TypeBadge type={editDraft.type} />
                  <h2 className="text-sm font-bold text-white line-clamp-1">
                    {editDraft.text || "Untitled"}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={cancelEdit}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e1810] border border-[#2e2418] text-sm text-[#6b5e4a]"
                >
                  <X size={13} /> Discard
                </button>
                <button
                  onClick={saveEdit}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c8a46e] text-sm font-bold text-[#13100d] hover:bg-[#d4b47e] shadow-md shadow-[#c8a46e]/20"
                >
                  <Check size={13} /> Save
                </button>
              </div>
            </div>
            <div className="flex-1 px-6 lg:px-8 py-6 max-w-3xl">
              <QuestionEditor q={editDraft} setQ={(q) => setEditDraft(q)} />
            </div>
          </>
        )}

        {/* CREATE */}
        {mode === "create" && createDraft && (
          <>
            <div className="sticky top-0 z-10 bg-[#13100d]/95 backdrop-blur-sm border-b border-[#2a231a] px-6 lg:px-8 py-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[#c8a46e] font-bold uppercase tracking-widest mb-0.5">
                  New question
                </p>
                <div className="flex items-center gap-2">
                  <TypeBadge type={createDraft.type} />
                </div>
              </div>
              <select
                value={createDraft.type}
                onChange={(e) =>
                  setCreateDraft(blankQuestion(e.target.value, createDraft.id))
                }
                className="bg-[#1a1510] border border-[#2e2418] rounded-xl px-3 py-2 text-xs text-[#a8987a] outline-none focus:border-[#c8a46e]/40"
              >
                {TYPE_LIST.map((t) => (
                  <option key={t} value={t}>
                    {TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={cancelCreate}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e1810] border border-[#2e2418] text-sm text-[#6b5e4a]"
                >
                  <X size={13} /> Cancel
                </button>
                <button
                  onClick={saveCreate}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c8a46e] text-sm font-bold text-[#13100d] hover:bg-[#d4b47e] shadow-md shadow-[#c8a46e]/20"
                >
                  <Check size={13} /> Create
                </button>
              </div>
            </div>
            <div className="flex-1 px-6 lg:px-8 py-6 max-w-3xl">
              <QuestionEditor q={createDraft} setQ={(q) => setCreateDraft(q)} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
