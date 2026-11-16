import { useState, useEffect, useMemo, useRef } from 'react';
import { Plus, Moon, Sun, Trash2, Tag as TagIcon, CheckCircle2, Inbox } from 'lucide-react';

const STORAGE_KEY = 'saas-todo-tasks';
const THEME_KEY = 'saas-todo-theme';

const PRIORITIES = [
  { value: 'low', label: 'Низкий', dot: 'bg-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', ring: 'ring-emerald-500' },
  { value: 'medium', label: 'Средний', dot: 'bg-amber-400', badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20', ring: 'ring-amber-500' },
  { value: 'high', label: 'Высокий', dot: 'bg-rose-400', badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20', ring: 'ring-rose-500' },
];

const DEFAULT_TAGS = ['Работа', 'Учёба', 'Личное', 'Здоровье', 'Покупки'];

const TAG_ICONS = { 'Работа': '💼', 'Учёба': '📚', 'Личное': '🏠', 'Здоровье': '💪', 'Покупки': '🛒' };

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState(localStorage.getItem(THEME_KEY) || 'dark');
  const [selectedTag, setSelectedTag] = useState('');
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const tagDropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(e.target)) {
        setShowTagDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setTasks(JSON.parse(saved)); } catch { setTasks([]); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const addTask = (e) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;
    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      tag: tagValue.trim() || 'Без категории',
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
    setInputValue('');
    setTagValue('');
    setPriority('medium');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round(completedCount / totalCount * 100);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      if (selectedTag) return t.tag === selectedTag;
      return true;
    });
  }, [tasks, filter, selectedTag]);

  const isDark = theme === 'dark';

  return (
    <div className={`transition-colors duration-300 min-h-screen ${isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'}`}>
      <div className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          <div className="rounded-3xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 md:p-8 shadow-2xl backdrop-blur-xl transition-colors duration-300">
            <div className="relative mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">TaskFlow</h1>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider dark:text-zinc-400">SaaS Todo Manager</p>
                </div>
              </div>
              <button
                onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-lg bg-white/60 border border-zinc-300/40 dark:bg-zinc-950/50 dark:border-zinc-700/50 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600/50 transition-all backdrop-blur-sm"
                aria-label="Сменить тему"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Прогресс выполнения</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{completedCount} из {totalCount} — {progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800/50 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700/30">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.3)] ${progressPercent >= 100 ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : ''}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <form onSubmit={addTask} className="space-y-3 mb-8">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                  <Plus className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Что нужно сделать?"
                  maxLength={200}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-white dark:bg-zinc-950/80 border border-zinc-300 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">Приоритет</label>
                    <div className="flex gap-3 sm:gap-4">
                      {PRIORITIES.map(p => (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => setPriority(p.value)}
                          className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-all ${
                            priority === p.value
                              ? `${p.badge} ring-2 ${p.ring}`
                              : 'bg-white/50 dark:bg-zinc-900/40 border-zinc-300 dark:border-zinc-800/50 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:border-zinc-400 dark:hover:border-zinc-600/50'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${p.dot} mr-1.5`}></span>
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">Тег</label>
                    <div className="relative" ref={tagDropdownRef}>
                      <input
                        type="text"
                        value={tagValue}
                        onChange={(e) => setTagValue(e.target.value)}
                        onFocus={() => setShowTagDropdown(true)}
                        placeholder="Напр. Работа"
                        className="w-full pl-9 pr-10 py-3 rounded-xl bg-white dark:bg-zinc-950/80 border border-zinc-300 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                        <TagIcon className="w-4 h-4" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowTagDropdown(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors p-1 shrink-0"
                        aria-label="Выбрать тег"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {showTagDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-950/95 backdrop-blur-xl border border-zinc-300 dark:border-zinc-700/50 rounded-xl shadow-xl z-50 p-1.5">
                          <div className="max-h-48 overflow-y-auto">
                            {DEFAULT_TAGS.map(tag => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => {
                                  setTagValue(tag);
                                  setShowTagDropdown(false);
                                }}
                                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all text-left text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
                              >
                                <span className="w-5 h-5 flex items-center justify-center text-xs rounded bg-zinc-100 dark:bg-zinc-900/50">
                                  {TAG_ICONS[tag]}
                                </span>
                                <span>{tag}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-full sm:w-auto sm:min-w-[140px] py-3 rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-fuchsia-500 hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Добавить
                </button>
              </div>
            </form>

            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: 'all', label: 'Все' },
                { id: 'active', label: 'Активные' },
                { id: 'completed', label: 'Завершённые' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    filter === f.id
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-white/50 dark:bg-zinc-900/40 border border-zinc-300 dark:border-zinc-800/50 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600/50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag('')}
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-white/50 dark:bg-zinc-900/40 border border-zinc-300 dark:border-zinc-800/50 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-300 transition-all flex items-center gap-1.5"
                >
                  <Trash2 className="w-3 h-3" /> Сбросить тег
                </button>
              )}
            </div>

            {selectedTag && (
              <div className="mb-6 flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Тег:</span>
                <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 text-xs font-medium">{selectedTag}</span>
              </div>
            )}

            {filteredTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 rounded-full border border-zinc-300 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Inbox className="w-10 h-10 text-zinc-600 dark:text-zinc-600" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-200 mb-2">
                  {selectedTag ? `Задач с тегом "{selectedTag}" пока нет` : 'Все задачи выполнены!'}
                </h2>
                <p className="text-zinc-600 text-sm max-w-sm mb-8 dark:text-zinc-400">
                  {selectedTag
                    ? 'Добавьте новую задачу с этим тегом, чтобы начать.'
                    : 'Отличная работа! Вы справились со всеми задачами. Отдохни и добавь что-то новое.'}
                </p>
                {!selectedTag && (
                  <button onClick={() => setFilter('all')} className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25">
                    Добавить задачу
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map(task => {
                  const prio = PRIORITIES.find(p => p.value === task.priority);
                  return (
                    <div
                      key={task.id}
                      className="group relative flex items-center gap-3.5 px-5 py-4 rounded-2xl border border-zinc-300 dark:border-zinc-800/50 bg-white dark:bg-zinc-950/40 backdrop-blur-sm transition-all hover:border-indigo-400 dark:hover:border-zinc-600/50 hover:scale-[1.01] hover:shadow-xl hover:shadow-zinc-900/20"
                    >
                      <div className="relative shrink-0">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="peer w-5 h-5 rounded-full border-zinc-300 dark:border-zinc-700 text-indigo-600 focus:ring-indigo-500/50 accent-indigo-600 cursor-pointer"
                        />
                        {task.completed && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className={`flex items-start gap-2 ${task.completed ? 'line-through text-zinc-400 dark:text-zinc-600' : 'text-zinc-900 dark:text-zinc-100'}`}>
                          <span className="text-sm font-medium break-words flex-1 min-w-0">{task.text}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter shrink-0 ${prio?.badge}`}>
                            {prio?.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 text-[10px] border border-zinc-300 dark:border-zinc-800/30`}>
                            <TagIcon className="w-3 h-3" /> {task.tag}
                          </span>
                        </div>
                      </div>

                      <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-300 hover:bg-rose-500 hover:text-white transition-all"
                          aria-label="Удалить задачу"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {totalCount > 0 && completedCount > 0 && (
              <div className="mt-8 flex justify-end pt-4 border-t border-zinc-300 dark:border-zinc-800/30">
                <button
                  onClick={clearCompleted}
                  className="text-xs font-medium text-zinc-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors underline decoration-zinc-300/30 dark:decoration-zinc-800/30 hover:decoration-rose-500"
                >
                  Очистить завершённые ({completedCount})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
