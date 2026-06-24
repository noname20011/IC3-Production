import { useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  X,
  Check,
  Filter,
  BookOpen,
} from "lucide-react";
import {
  passwords as initPasswords,
  schools as initSchools,
  ExamPassword,
  School,
  questionsData,
  levels,
  partsByLevel,
} from "@/data/mockData";
import AdminSidebar from "@/components/UI/admin/AdminSideBar";
import { useNavigate } from "react-router-dom";

type Tab = "passwords" | "schools" | "tests" | "parts" | "questions";

interface DataManagementProps {
  onNavigate: (screen: string) => void;
  onOpenPartQuestions?: (partId: number) => void;
  initialTab?: Tab;
}

function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  const c = color ?? "#c8a46e";
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
      style={{ color: c, background: `${c}18`, border: `1px solid ${c}25` }}
    >
      {children}
    </span>
  );
}

function SortBtn({
  dir,
  onSort,
}: {
  dir: "asc" | "desc" | null;
  onSort: () => void;
}) {
  return (
    <button
      onClick={onSort}
      className="inline-flex flex-col ml-1 opacity-50 hover:opacity-100 transition-opacity"
    >
      <ChevronUp size={10} className={dir === "asc" ? "text-[#c8a46e]" : ""} />
      <ChevronDown
        size={10}
        className={dir === "desc" ? "text-[#c8a46e]" : ""}
      />
    </button>
  );
}

function TableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#2e2418]">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

// ── Passwords Tab ──────────────────────────────────────────────────────────────
function PasswordsTab() {
  const [items, setItems] = useState<ExamPassword[]>(initPasswords);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<{
    key: keyof ExamPassword;
    dir: "asc" | "desc";
  } | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<ExamPassword>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({
    code: "",
    school: "",
    level: "",
    part: "",
    expires: "",
    maxUses: 30,
  });

  const toggle = (key: keyof ExamPassword) => {
    setSort((s) =>
      s?.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  };

  const filtered = items
    .filter((p) =>
      [p.code, p.school, p.level, p.part].some((v) =>
        v.toLowerCase().includes(search.toLowerCase()),
      ),
    )
    .sort((a, b) => {
      if (!sort) return 0;
      const av = String(a[sort.key]),
        bv = String(b[sort.key]);
      return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  const save = (id: number) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...editData } : p)),
    );
    setEditing(null);
  };
  const del = (id: number) =>
    setItems((prev) => prev.filter((p) => p.id !== id));
  const add = () => {
    if (!newItem.code) return;
    setItems((prev) => [
      ...prev,
      {
        ...newItem,
        id: Date.now(),
        uses: 0,
        created: new Date().toISOString().split("T")[0],
      },
    ]);
    setShowAdd(false);
    setNewItem({
      code: "",
      school: "",
      level: "",
      part: "",
      expires: "",
      maxUses: 30,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-[#1a1510] border border-[#2e2418] rounded-xl px-4 py-2.5 flex-1 min-w-[200px]">
          <Search size={14} className="text-[#4a3d2e] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search code, school, level…"
            className="bg-transparent text-sm text-white placeholder-[#3a3020] outline-none flex-1"
          />
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c8a46e]/15 border border-[#c8a46e]/30 text-[#c8a46e] text-sm font-semibold hover:bg-[#c8a46e]/25 transition-colors"
        >
          <Plus size={14} /> Add Password
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#1a1510] border border-[#2e2418] rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Code", key: "code", placeholder: "EXAM-CODE" },
            { label: "School", key: "school", placeholder: "School name" },
            { label: "Level", key: "level", placeholder: "Level 1" },
            { label: "Part", key: "part", placeholder: "Part 1" },
            {
              label: "Expires",
              key: "expires",
              placeholder: "2024-12-31",
              type: "date",
            },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-[10px] text-[#6b5e4a] font-semibold uppercase tracking-widest mb-1">
                {f.label}
              </label>
              <input
                type={f.type ?? "text"}
                placeholder={f.placeholder}
                value={(newItem as Record<string, unknown>)[f.key] as string}
                onChange={(e) =>
                  setNewItem((n) => ({ ...n, [f.key]: e.target.value }))
                }
                className="w-full bg-[#13100d] border border-[#2a2418] rounded-xl px-3 py-2 text-xs text-white placeholder-[#3a3020] outline-none focus:border-[#c8a46e]/40"
              />
            </div>
          ))}
          <div className="col-span-full flex gap-3 pt-2">
            <button
              onClick={() => setShowAdd(false)}
              className="px-5 py-2 rounded-xl border border-[#2e2418] text-xs text-[#5a4e3a]"
            >
              Cancel
            </button>
            <button
              onClick={add}
              className="px-5 py-2 rounded-xl bg-[#c8a46e] text-xs font-bold text-[#13100d]"
            >
              Create
            </button>
          </div>
        </div>
      )}

      <TableWrapper>
        <thead className="bg-[#1a1510] border-b border-[#2e2418]">
          <tr>
            {["Code", "School", "Level", "Part", "Expires", "Uses", ""].map(
              (h, i) => (
                <th
                  key={h + i}
                  className="px-4 py-3 text-left text-[10px] font-bold text-[#6b5e4a] uppercase tracking-widest whitespace-nowrap"
                >
                  {h}
                  {h && i < 5 && (
                    <SortBtn
                      dir={sort?.key === h.toLowerCase() ? sort.dir : null}
                      onSort={() =>
                        toggle(h.toLowerCase() as keyof ExamPassword)
                      }
                    />
                  )}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1e1810]">
          {filtered.map((p) => (
            <tr
              key={p.id}
              className="bg-[#13100d] hover:bg-[#1a1510] transition-colors"
            >
              {editing === p.id ? (
                <>
                  <td className="px-4 py-2.5">
                    <input
                      value={editData.code ?? p.code}
                      onChange={(e) =>
                        setEditData((d) => ({ ...d, code: e.target.value }))
                      }
                      className="bg-[#1e1810] border border-[#2a2418] rounded-lg px-2 py-1 text-xs text-white outline-none w-28 font-mono"
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      value={editData.school ?? p.school}
                      onChange={(e) =>
                        setEditData((d) => ({ ...d, school: e.target.value }))
                      }
                      className="bg-[#1e1810] border border-[#2a2418] rounded-lg px-2 py-1 text-xs text-white outline-none w-32"
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      value={editData.level ?? p.level}
                      onChange={(e) =>
                        setEditData((d) => ({ ...d, level: e.target.value }))
                      }
                      className="bg-[#1e1810] border border-[#2a2418] rounded-lg px-2 py-1 text-xs text-white outline-none w-24"
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      value={editData.part ?? p.part}
                      onChange={(e) =>
                        setEditData((d) => ({ ...d, part: e.target.value }))
                      }
                      className="bg-[#1e1810] border border-[#2a2418] rounded-lg px-2 py-1 text-xs text-white outline-none w-20"
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      type="date"
                      value={editData.expires ?? p.expires}
                      onChange={(e) =>
                        setEditData((d) => ({ ...d, expires: e.target.value }))
                      }
                      className="bg-[#1e1810] border border-[#2a2418] rounded-lg px-2 py-1 text-xs text-white outline-none w-28"
                    />
                  </td>
                  <td className="px-4 py-2.5 text-xs text-[#6b5e4a]">
                    {p.uses}/{p.maxUses}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => save(p.id)}
                        className="p-1.5 rounded-lg bg-emerald-400/15 hover:bg-emerald-400/25 transition-colors"
                      >
                        <Check size={12} className="text-emerald-400" />
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="p-1.5 rounded-lg bg-[#2a2418] hover:bg-[#3a3020] transition-colors"
                      >
                        <X size={12} className="text-[#6b5e4a]" />
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-[#c8a46e] bg-[#c8a46e]/8 px-2 py-0.5 rounded">
                      {p.code}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#a8987a] max-w-[160px] truncate">
                    {p.school}
                  </td>
                  <td className="px-4 py-3">
                    <Badge>{p.level}</Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#6b5e4a]">{p.part}</td>
                  <td className="px-4 py-3 text-xs text-[#6b5e4a] whitespace-nowrap">
                    {p.expires}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-[#2a2418] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#c8a46e] rounded-full"
                          style={{
                            width: `${Math.min((p.uses / p.maxUses) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-[#5a4e3a]">
                        {p.uses}/{p.maxUses}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setEditing(p.id);
                          setEditData({});
                        }}
                        className="p-1.5 rounded-lg hover:bg-[#2a2418] transition-colors"
                      >
                        <Pencil size={12} className="text-[#5a4e3a]" />
                      </button>
                      <button
                        onClick={() => del(p.id)}
                        className="p-1.5 rounded-lg hover:bg-red-400/10 transition-colors"
                      >
                        <Trash2
                          size={12}
                          className="text-[#4a3d2e] hover:text-red-400"
                        />
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </TableWrapper>
      <p className="text-[11px] text-[#4a3d2e]">
        {filtered.length} record{filtered.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

// ── Schools Tab ──────────────────────────────────────────────────────────────
function SchoolsTab() {
  const [items, setItems] = useState<School[]>(initSchools);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<School>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", city: "", students: 0 });

  const filtered = items.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.city.toLowerCase().includes(search.toLowerCase()),
  );

  const save = (id: number) => {
    setItems((p) => p.map((s) => (s.id === id ? { ...s, ...editData } : s)));
    setEditing(null);
  };
  const del = (id: number) => setItems((p) => p.filter((s) => s.id !== id));
  const toggle = (id: number) =>
    setItems((p) =>
      p.map((s) => (s.id === id ? { ...s, active: !s.active } : s)),
    );
  const add = () => {
    if (!newItem.name) return;
    setItems((p) => [...p, { ...newItem, id: Date.now(), active: true }]);
    setShowAdd(false);
    setNewItem({ name: "", city: "", students: 0 });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-[#1a1510] border border-[#2e2418] rounded-xl px-4 py-2.5 flex-1 min-w-[200px]">
          <Search size={14} className="text-[#4a3d2e] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search schools…"
            className="bg-transparent text-sm text-white placeholder-[#3a3020] outline-none flex-1"
          />
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c8a46e]/15 border border-[#c8a46e]/30 text-[#c8a46e] text-sm font-semibold hover:bg-[#c8a46e]/25 transition-colors"
        >
          <Plus size={14} /> Add School
        </button>
      </div>

      {showAdd && (
        <div className="bg-[#1a1510] border border-[#2e2418] rounded-2xl p-5 grid grid-cols-3 gap-3">
          {[
            { label: "School Name", key: "name" },
            { label: "City", key: "city" },
            { label: "Students", key: "students", type: "number" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-[10px] text-[#6b5e4a] font-semibold uppercase tracking-widest mb-1">
                {f.label}
              </label>
              <input
                type={f.type ?? "text"}
                value={(newItem as Record<string, unknown>)[f.key] as string}
                onChange={(e) =>
                  setNewItem((n) => ({
                    ...n,
                    [f.key]:
                      f.type === "number" ? +e.target.value : e.target.value,
                  }))
                }
                className="w-full bg-[#13100d] border border-[#2a2418] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#c8a46e]/40"
              />
            </div>
          ))}
          <div className="col-span-full flex gap-3">
            <button
              onClick={() => setShowAdd(false)}
              className="px-5 py-2 rounded-xl border border-[#2e2418] text-xs text-[#5a4e3a]"
            >
              Cancel
            </button>
            <button
              onClick={add}
              className="px-5 py-2 rounded-xl bg-[#c8a46e] text-xs font-bold text-[#13100d]"
            >
              Add School
            </button>
          </div>
        </div>
      )}

      <TableWrapper>
        <thead className="bg-[#1a1510] border-b border-[#2e2418]">
          <tr>
            {["School Name", "City", "Students", "Status", ""].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-[10px] font-bold text-[#6b5e4a] uppercase tracking-widest"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1e1810]">
          {filtered.map((s) => (
            <tr
              key={s.id}
              className="bg-[#13100d] hover:bg-[#1a1510] transition-colors"
            >
              {editing === s.id ? (
                <>
                  <td className="px-4 py-2.5">
                    <input
                      value={editData.name ?? s.name}
                      onChange={(e) =>
                        setEditData((d) => ({ ...d, name: e.target.value }))
                      }
                      className="bg-[#1e1810] border border-[#2a2418] rounded-lg px-2 py-1 text-xs text-white outline-none w-40"
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      value={editData.city ?? s.city}
                      onChange={(e) =>
                        setEditData((d) => ({ ...d, city: e.target.value }))
                      }
                      className="bg-[#1e1810] border border-[#2a2418] rounded-lg px-2 py-1 text-xs text-white outline-none w-28"
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      type="number"
                      value={editData.students ?? s.students}
                      onChange={(e) =>
                        setEditData((d) => ({
                          ...d,
                          students: +e.target.value,
                        }))
                      }
                      className="bg-[#1e1810] border border-[#2a2418] rounded-lg px-2 py-1 text-xs text-white outline-none w-20"
                    />
                  </td>
                  <td className="px-4 py-2.5" />
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1">
                      <button
                        onClick={() => save(s.id)}
                        className="p-1.5 rounded-lg bg-emerald-400/15"
                      >
                        <Check size={12} className="text-emerald-400" />
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="p-1.5 rounded-lg bg-[#2a2418]"
                      >
                        <X size={12} className="text-[#6b5e4a]" />
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-3 text-sm text-[#c8a46e] font-medium">
                    {s.name}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#6b5e4a]">{s.city}</td>
                  <td className="px-4 py-3 text-xs text-[#a8987a]">
                    {s.students}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggle(s.id)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors ${s.active ? "bg-emerald-400/12 text-emerald-400" : "bg-[#2a2418] text-[#4a3d2e]"}`}
                    >
                      {s.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setEditing(s.id);
                          setEditData({});
                        }}
                        className="p-1.5 rounded-lg hover:bg-[#2a2418]"
                      >
                        <Pencil size={12} className="text-[#5a4e3a]" />
                      </button>
                      <button
                        onClick={() => del(s.id)}
                        className="p-1.5 rounded-lg hover:bg-red-400/10"
                      >
                        <Trash2 size={12} className="text-[#4a3d2e]" />
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </TableWrapper>
      <p className="text-[11px] text-[#4a3d2e]">
        {filtered.length} school{filtered.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

// ── Tests Tab ─────────────────────────────────────────────────────────────────
function TestsTab() {
  const allParts = Object.values(partsByLevel).flat();
  const [search, setSearch] = useState("");
  const filtered = allParts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.topic.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 bg-[#1a1510] border border-[#2e2418] rounded-xl px-4 py-2.5 max-w-sm">
        <Search size={14} className="text-[#4a3d2e] shrink-0" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tests…"
          className="bg-transparent text-sm text-white placeholder-[#3a3020] outline-none flex-1"
        />
      </div>
      <TableWrapper>
        <thead className="bg-[#1a1510] border-b border-[#2e2418]">
          <tr>
            {[
              "Name",
              "Topic",
              "Level",
              "Questions",
              "Duration",
              "Difficulty",
              "",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-[10px] font-bold text-[#6b5e4a] uppercase tracking-widest"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1e1810]">
          {filtered.map((p) => {
            const lv = levels.find((l) => l.id === p.levelId);
            return (
              <tr
                key={p.id}
                className="bg-[#13100d] hover:bg-[#1a1510] transition-colors"
              >
                <td className="px-4 py-3 text-sm text-[#c8a46e] font-medium">
                  {p.name}
                </td>
                <td className="px-4 py-3 text-xs text-[#a8987a] max-w-[200px] truncate">
                  {p.topic}
                </td>
                <td className="px-4 py-3">
                  <Badge>{lv?.name ?? "—"}</Badge>
                </td>
                <td className="px-4 py-3 text-xs text-[#6b5e4a]">
                  {p.questions}
                </td>
                <td className="px-4 py-3 text-xs text-[#6b5e4a]">
                  {p.duration} min
                </td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-semibold text-[#8a7a65]">
                    {p.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-[#2a2418]">
                      <Pencil size={12} className="text-[#5a4e3a]" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-400/10">
                      <Trash2 size={12} className="text-[#4a3d2e]" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableWrapper>
    </div>
  );
}

// ── Parts Tab ─────────────────────────────────────────────────────────────────
function PartsTab({
  onOpenPartQuestions,
}: {
  onOpenPartQuestions?: (partId: number) => void;
}) {
  const navigate = useNavigate();
  const allParts = Object.values(partsByLevel).flat();
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const filtered = allParts.filter((p) => {
    return (
      (filterLevel === "all" || String(p.levelId) === filterLevel) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.topic.toLowerCase().includes(search.toLowerCase()))
    );
  });
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-[#1a1510] border border-[#2e2418] rounded-xl px-4 py-2.5 flex-1 min-w-[200px]">
          <Search size={14} className="text-[#4a3d2e] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search parts…"
            className="bg-transparent text-sm text-white placeholder-[#3a3020] outline-none flex-1"
          />
        </div>
        <div className="flex items-center gap-2 bg-[#1a1510] border border-[#2e2418] rounded-xl px-3 py-2">
          <Filter size={13} className="text-[#4a3d2e]" />
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="bg-transparent text-xs text-[#a8987a] outline-none"
          >
            <option value="all">All Levels</option>
            {levels.map((l) => (
              <option key={l.id} value={String(l.id)}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {onOpenPartQuestions && (
        <div className="flex items-center gap-2 text-xs text-[#5a4e3a] bg-[#1a1510] border border-[#2e2418] rounded-xl px-4 py-2.5">
          <BookOpen size={13} className="text-[#c8a46e]" />
          Click{" "}
          <span className="text-[#c8a46e] font-semibold">
            Manage Questions
          </span>{" "}
          on any part to open the Question Manager.
        </div>
      )}
      <TableWrapper>
        <thead className="bg-[#1a1510] border-b border-[#2e2418]">
          <tr>
            {[
              "Part",
              "Topic",
              "Level",
              "Questions",
              "Duration",
              "Difficulty",
              "",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-[10px] font-bold text-[#6b5e4a] uppercase tracking-widest"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1e1810]">
          {filtered.map((p) => {
            const lv = levels.find((l) => l.id === p.levelId);
            return (
              <tr
                key={p.id}
                className="bg-[#13100d] hover:bg-[#1a1510] transition-colors group"
              >
                <td className="px-4 py-3 text-sm text-[#c8a46e] font-medium">
                  {p.name}
                </td>
                <td className="px-4 py-3 text-xs text-[#a8987a] max-w-[200px] truncate">
                  {p.topic}
                </td>
                <td className="px-4 py-3">
                  <Badge>{lv?.name ?? "—"}</Badge>
                </td>
                <td className="px-4 py-3 text-xs text-[#6b5e4a]">
                  {p.questions}
                </td>
                <td className="px-4 py-3 text-xs text-[#6b5e4a]">
                  {p.duration} min
                </td>
                <td className="px-4 py-3 text-xs text-[#8a7a65]">
                  {p.difficulty}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    {onOpenPartQuestions && (
                      <button
                        onClick={() => {
                          onOpenPartQuestions(p.id)
                          navigate(`/admin/${p.id}/question/management`)
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c8a46e]/10 border border-[#c8a46e]/20 text-[10px] font-bold text-[#c8a46e] hover:bg-[#c8a46e]/20 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <BookOpen size={11} /> Manage Questions
                      </button>
                    )}
                    <button className="p-1.5 rounded-lg hover:bg-[#2a2418] transition-colors">
                      <Pencil size={12} className="text-[#5a4e3a]" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-red-400/10 transition-colors">
                      <Trash2 size={12} className="text-[#4a3d2e]" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableWrapper>
      <p className="text-[11px] text-[#4a3d2e]">
        {filtered.length} part{filtered.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

// ── Questions Tab ─────────────────────────────────────────────────────────────
const typeColors: Record<string, string> = {
  single: "#4ade80",
  multiple: "#fb923c",
  truefalse: "#60a5fa",
  reorder: "#c084fc",
  match: "#f472b6",
  hotspot: "#c8a46e",
};
const typeLabels: Record<string, string> = {
  single: "Single",
  multiple: "Multiple",
  truefalse: "T/F",
  reorder: "Reorder",
  match: "Match",
  hotspot: "Hotspot",
};

function QuestionsTab() {
  const [items, setItems] = useState(questionsData);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const filtered = items.filter(
    (q) =>
      (filterType === "all" || q.type === filterType) &&
      q.text.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-[#1a1510] border border-[#2e2418] rounded-xl px-4 py-2.5 flex-1 min-w-[200px]">
          <Search size={14} className="text-[#4a3d2e] shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions…"
            className="bg-transparent text-sm text-white placeholder-[#3a3020] outline-none flex-1"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            "all",
            "single",
            "multiple",
            "truefalse",
            "reorder",
            "match",
            "hotspot",
          ].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${filterType === t ? "bg-[#c8a46e]/15 border border-[#c8a46e]/30 text-[#c8a46e]" : "bg-[#1a1510] border border-[#2e2418] text-[#5a4e3a] hover:text-[#a8987a]"}`}
            >
              {t === "all" ? "All" : typeLabels[t]}
            </button>
          ))}
        </div>
      </div>
      <TableWrapper>
        <thead className="bg-[#1a1510] border-b border-[#2e2418]">
          <tr>
            {["Question", "Type", "Level", "Part", "Points", ""].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-left text-[10px] font-bold text-[#6b5e4a] uppercase tracking-widest"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1e1810]">
          {filtered.map((q) => (
            <tr
              key={q.id}
              className="bg-[#13100d] hover:bg-[#1a1510] transition-colors"
            >
              <td className="px-4 py-3 text-sm text-[#a8987a] max-w-[280px]">
                <p className="truncate">{q.text}</p>
              </td>
              <td className="px-4 py-3">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded"
                  style={{
                    color: typeColors[q.type] ?? "#c8a46e",
                    background: `${typeColors[q.type] ?? "#c8a46e"}18`,
                  }}
                >
                  {typeLabels[q.type] ?? q.type}
                </span>
              </td>
              <td className="px-4 py-3">
                <Badge>{q.level}</Badge>
              </td>
              <td className="px-4 py-3 text-xs text-[#6b5e4a]">{q.part}</td>
              <td className="px-4 py-3 text-xs text-[#c8a46e] font-bold">
                {q.points}
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-[#2a2418]">
                    <Pencil size={12} className="text-[#5a4e3a]" />
                  </button>
                  <button
                    onClick={() =>
                      setItems((p) => p.filter((x) => x.id !== q.id))
                    }
                    className="p-1.5 rounded-lg hover:bg-red-400/10"
                  >
                    <Trash2 size={12} className="text-[#4a3d2e]" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
      <p className="text-[11px] text-[#4a3d2e]">
        {filtered.length} question{filtered.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
const tabs: { id: Tab; label: string }[] = [
  { id: "passwords", label: "Passwords" },
  { id: "schools", label: "Schools" },
  { id: "tests", label: "Tests" },
  { id: "parts", label: "Parts" },
  { id: "questions", label: "Questions" },
];

export default function DataManagement({
  onNavigate,
  onOpenPartQuestions,
  initialTab = "passwords",
}: DataManagementProps) {
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <div className="flex min-h-screen bg-[#13100d] md:ml-[280px]">
      <AdminSidebar active="datamgmt" onNavigate={onNavigate} />

      <main className="flex-1 min-w-0 overflow-y-auto">
        <header className="sticky top-0 z-10 bg-[#13100d]/95 backdrop-blur-md border-b border-[#2a231a]">
          <div className="px-6 lg:px-10 py-4">
            <p className="text-xs text-[#6b5e4a] font-medium">Administration</p>
            <h1 className="text-xl font-bold text-white">Data Management</h1>
          </div>
          <div className="flex gap-1 px-6 lg:px-10 pb-0">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition-all ${tab === t.id ? "border-[#c8a46e] text-[#c8a46e]" : "border-transparent text-[#5a4e3a] hover:text-[#a8987a]"}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </header>

        <div className="px-6 lg:px-10 py-7 max-w-7xl mx-auto">
          {tab === "passwords" && <PasswordsTab />}
          {tab === "schools" && <SchoolsTab />}
          {tab === "tests" && <TestsTab />}
          {tab === "parts" && (
            <PartsTab onOpenPartQuestions={onOpenPartQuestions} />
          )}
          {tab === "questions" && <QuestionsTab />}
        </div>
      </main>
    </div>
  );
}
