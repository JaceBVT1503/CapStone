(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/useHighlights.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useHighlights",
    ()=>useHighlights
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const COLOR_OPTIONS = [
    {
        id: "yellow",
        label: "Yellow",
        hex: "#fef3c7"
    },
    {
        id: "pink",
        label: "Pink",
        hex: "#fbcfe8"
    },
    {
        id: "blue",
        label: "Blue",
        hex: "#bfdbfe"
    },
    {
        id: "green",
        label: "Green",
        hex: "#bbf7d0"
    }
];
function useHighlights() {
    _s();
    const [highlights, setHighlights] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const addHighlight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHighlights.useCallback[addHighlight]": (messageId, startOffset, endOffset, color, comment)=>{
            const highlightId = crypto.randomUUID();
            setHighlights({
                "useHighlights.useCallback[addHighlight]": (prev)=>({
                        ...prev,
                        [messageId]: [
                            ...prev[messageId] || [],
                            {
                                id: highlightId,
                                startOffset,
                                endOffset,
                                color,
                                comment,
                                createdAt: Date.now()
                            }
                        ]
                    })
            }["useHighlights.useCallback[addHighlight]"]);
            return highlightId;
        }
    }["useHighlights.useCallback[addHighlight]"], []);
    const removeHighlight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHighlights.useCallback[removeHighlight]": (messageId, highlightId)=>{
            setHighlights({
                "useHighlights.useCallback[removeHighlight]": (prev)=>({
                        ...prev,
                        [messageId]: (prev[messageId] || []).filter({
                            "useHighlights.useCallback[removeHighlight]": (h)=>h.id !== highlightId
                        }["useHighlights.useCallback[removeHighlight]"])
                    })
            }["useHighlights.useCallback[removeHighlight]"]);
        }
    }["useHighlights.useCallback[removeHighlight]"], []);
    const updateHighlight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHighlights.useCallback[updateHighlight]": (messageId, highlightId, updates)=>{
            setHighlights({
                "useHighlights.useCallback[updateHighlight]": (prev)=>({
                        ...prev,
                        [messageId]: (prev[messageId] || []).map({
                            "useHighlights.useCallback[updateHighlight]": (h)=>h.id === highlightId ? {
                                    ...h,
                                    ...updates
                                } : h
                        }["useHighlights.useCallback[updateHighlight]"])
                    })
            }["useHighlights.useCallback[updateHighlight]"]);
        }
    }["useHighlights.useCallback[updateHighlight]"], []);
    const getHighlightsForMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useHighlights.useCallback[getHighlightsForMessage]": (messageId)=>highlights[messageId] || []
    }["useHighlights.useCallback[getHighlightsForMessage]"], [
        highlights
    ]);
    return {
        highlights,
        addHighlight,
        removeHighlight,
        updateHighlight,
        getHighlightsForMessage,
        COLOR_OPTIONS
    };
}
_s(useHighlights, "D2jfWP2rYwkFqUxm8vLS2xWd040=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "activeHint": "page-module___8aEwW__activeHint",
  "assistantRow": "page-module___8aEwW__assistantRow",
  "badge": "page-module___8aEwW__badge",
  "bubble": "page-module___8aEwW__bubble",
  "chat": "page-module___8aEwW__chat",
  "chatWrapper": "page-module___8aEwW__chatWrapper",
  "checkboxGroup": "page-module___8aEwW__checkboxGroup",
  "checkboxLabel": "page-module___8aEwW__checkboxLabel",
  "colorDot": "page-module___8aEwW__colorDot",
  "composer": "page-module___8aEwW__composer",
  "composerBar": "page-module___8aEwW__composerBar",
  "configGroup": "page-module___8aEwW__configGroup",
  "configLabel": "page-module___8aEwW__configLabel",
  "controls": "page-module___8aEwW__controls",
  "emptySidebar": "page-module___8aEwW__emptySidebar",
  "errorBanner": "page-module___8aEwW__errorBanner",
  "errorText": "page-module___8aEwW__errorText",
  "errorTitle": "page-module___8aEwW__errorTitle",
  "ghostButton": "page-module___8aEwW__ghostButton",
  "header": "page-module___8aEwW__header",
  "highlightCard": "page-module___8aEwW__highlightCard",
  "highlightComment": "page-module___8aEwW__highlightComment",
  "highlightDetails": "page-module___8aEwW__highlightDetails",
  "highlightQuote": "page-module___8aEwW__highlightQuote",
  "highlights": "page-module___8aEwW__highlights",
  "kbd": "page-module___8aEwW__kbd",
  "messageHighlights": "page-module___8aEwW__messageHighlights",
  "messageList": "page-module___8aEwW__messageList",
  "messageMeta": "page-module___8aEwW__messageMeta",
  "messageRow": "page-module___8aEwW__messageRow",
  "msgLabel": "page-module___8aEwW__msgLabel",
  "msgRole": "page-module___8aEwW__msgRole",
  "msgTime": "page-module___8aEwW__msgTime",
  "page": "page-module___8aEwW__page",
  "primaryButton": "page-module___8aEwW__primaryButton",
  "radioGroup": "page-module___8aEwW__radioGroup",
  "radioLabel": "page-module___8aEwW__radioLabel",
  "removeHighlightBtn": "page-module___8aEwW__removeHighlightBtn",
  "roleTag": "page-module___8aEwW__roleTag",
  "sectionTitle": "page-module___8aEwW__sectionTitle",
  "select": "page-module___8aEwW__select",
  "selectLabel": "page-module___8aEwW__selectLabel",
  "selectWrap": "page-module___8aEwW__selectWrap",
  "setupForm": "page-module___8aEwW__setupForm",
  "setupSection": "page-module___8aEwW__setupSection",
  "shell": "page-module___8aEwW__shell",
  "sidebar": "page-module___8aEwW__sidebar",
  "sidebarContent": "page-module___8aEwW__sidebarContent",
  "sidebarHeader": "page-module___8aEwW__sidebarHeader",
  "sidebarTitle": "page-module___8aEwW__sidebarTitle",
  "subtitle": "page-module___8aEwW__subtitle",
  "textarea": "page-module___8aEwW__textarea",
  "timeTag": "page-module___8aEwW__timeTag",
  "tip": "page-module___8aEwW__tip",
  "title": "page-module___8aEwW__title",
  "titleBlock": "page-module___8aEwW__titleBlock",
  "titleRow": "page-module___8aEwW__titleRow",
  "toggle": "page-module___8aEwW__toggle",
  "toggleLabel": "page-module___8aEwW__toggleLabel",
  "toggleThumb": "page-module___8aEwW__toggleThumb",
  "toggleTrack": "page-module___8aEwW__toggleTrack",
  "userRow": "page-module___8aEwW__userRow",
});
}),
"[project]/src/store/study-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStudyStore",
    ()=>useStudyStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
"use client";
;
const useStudyStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        currentStep: "initial-prompt",
        setStep: (step)=>set({
                currentStep: step
            }),
        user: null,
        setUserInfo: (participant)=>set({
                user: participant
            })
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/InitialPrompt.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InitialPrompt
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/page.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const GRADE_OPTIONS = [
    {
        id: "freshman",
        label: "Freshman"
    },
    {
        id: "sophomore",
        label: "Sophomore"
    },
    {
        id: "junior",
        label: "Junior"
    },
    {
        id: "senior",
        label: "Senior"
    },
    {
        id: "other",
        label: "Other"
    }
];
const AI_EXPERIENCE_OPTIONS = [
    {
        id: "yes",
        label: "Yes"
    },
    {
        id: "no",
        label: "No"
    }
];
const FOLLOW_UPS = [
    {
        id: "EmailCoach",
        label: "What is a company that you would be interested in working at?"
    },
    {
        id: "ConceptCoach",
        label: "What is a subject that you know a lot about?"
    }
];
const ROLES = [
    {
        id: "MathTutor",
        label: "Math Tutor"
    },
    {
        id: "WritingGrammarExpert",
        label: "Writing / Grammar Expert"
    },
    {
        id: "SeniorSoftwareEngineerDebugger",
        label: "Senior Software Engineer (Debugging)"
    },
    {
        id: "EmailCoach",
        label: "Write an email to a recruiter"
    },
    {
        id: "ConceptCoach",
        label: "Explain something you know well"
    },
    {
        id: "InvestmentPortfolio",
        label: "Develop an investment portfolio"
    }
];
function isUserInfoComplete(userInfo) {
    const { name, grade, major, aiExperience, tasks } = userInfo ?? {};
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedMajor = typeof major === "string" ? major.trim() : "";
    const gradeSet = new Set(GRADE_OPTIONS.map((g)=>g.id));
    const isValidGrade = typeof grade === "string" && gradeSet.has(grade);
    const isValidAiExperience = aiExperience === "yes" || aiExperience === "no";
    const isValidTasks = tasks && tasks.length === 2;
    return Boolean(trimmedName && trimmedMajor && isValidGrade && isValidAiExperience && isValidTasks);
}
function InitialPrompt() {
    _s();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [grade, setGrade] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [major, setMajor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [aiExperience, setAiExperience] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSending, setIsSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tasks, setStudyTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [followUpAnswers, setFollowUpAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const isUserInfoCompleteValue = isUserInfoComplete({
        name,
        grade,
        major,
        aiExperience,
        tasks
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shell,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleBlock,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleRow,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                        children: "AI Chatbot Experiment"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                        lineNumber: 76,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badge,
                                        children: "Setup"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                        lineNumber: 77,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                                children: "Configure the experiment and enter the initial prompt."
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/components/InitialPrompt.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorBanner,
                    role: "alert",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorTitle,
                            children: "Error"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/InitialPrompt.tsx",
                            lineNumber: 85,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorText,
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/InitialPrompt.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/InitialPrompt.tsx",
                    lineNumber: 84,
                    columnNumber: 11
                }, this) : null,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chat,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].setupForm,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].setupSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                        children: "Your Information"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].configGroup,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].configLabel,
                                                htmlFor: "nameInput",
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                lineNumber: 96,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "nameInput",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textarea,
                                                value: name,
                                                placeholder: "Enter your name",
                                                onChange: (e)=>setName(e.target.value),
                                                disabled: isSending,
                                                required: true,
                                                type: "text"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                lineNumber: 99,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].configGroup,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].configLabel,
                                                htmlFor: "gradeSelect",
                                                children: "Grade"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                lineNumber: 112,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                id: "gradeSelect",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                                                value: grade,
                                                onChange: (e)=>setGrade(e.target.value),
                                                disabled: isSending,
                                                required: true,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        disabled: true,
                                                        children: "Select grade..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 19
                                                    }, this),
                                                    GRADE_OPTIONS.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: g.id,
                                                            children: g.label
                                                        }, g.id, false, {
                                                            fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                            lineNumber: 127,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                lineNumber: 115,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                        lineNumber: 111,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].configGroup,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].configLabel,
                                                htmlFor: "majorInput",
                                                children: "Major"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                lineNumber: 135,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "majorInput",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textarea,
                                                value: major,
                                                placeholder: "Enter your major",
                                                onChange: (e)=>setMajor(e.target.value),
                                                disabled: isSending,
                                                required: true,
                                                type: "text"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                lineNumber: 138,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].configGroup,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].configLabel,
                                                children: "AI Experience"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                lineNumber: 151,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioGroup,
                                                children: AI_EXPERIENCE_OPTIONS.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioLabel,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "radio",
                                                                name: "aiExperience",
                                                                value: opt.id,
                                                                checked: aiExperience === opt.id,
                                                                onChange: (e)=>setAiExperience(e.target.value),
                                                                disabled: isSending,
                                                                required: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                                lineNumber: 155,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: opt.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                                lineNumber: 164,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, opt.id, true, {
                                                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                        lineNumber: 154,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                lineNumber: 152,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].setupSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                        children: "Task Configuration"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].configGroup,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selectLabel,
                                                htmlFor: "taskSelect",
                                                children: "Select Two Tasks"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                lineNumber: 175,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioGroup,
                                                children: ROLES.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioLabel,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "checkbox",
                                                                value: r.id,
                                                                checked: tasks.includes(r.id),
                                                                disabled: isSending,
                                                                onChange: (e)=>{
                                                                    const { value, checked } = e.target;
                                                                    const roleId = value;
                                                                    setStudyTasks((prev)=>{
                                                                        if (checked) {
                                                                            if (prev.length < 2) {
                                                                                return [
                                                                                    ...prev,
                                                                                    roleId
                                                                                ];
                                                                            }
                                                                            return prev;
                                                                        } else {
                                                                            return prev.filter((id)=>id !== roleId);
                                                                        }
                                                                    });
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                                lineNumber: 181,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: r.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                                lineNumber: 203,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, r.id, true, {
                                                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                        lineNumber: 180,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                lineNumber: 178,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                        lineNumber: 174,
                                        columnNumber: 15
                                    }, this),
                                    tasks.map((taskId)=>{
                                        const followUp = FOLLOW_UPS.find((f)=>f.id === taskId);
                                        if (followUp) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].configGroup,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].configLabel,
                                                        htmlFor: `followUp-${taskId}`,
                                                        children: followUp.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        id: `followUp-${taskId}`,
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textarea,
                                                        type: "text",
                                                        value: followUpAnswers[taskId] || "",
                                                        placeholder: "Enter your answer...",
                                                        onChange: (e)=>setFollowUpAnswers((prev)=>({
                                                                    ...prev,
                                                                    [taskId]: e.target.value
                                                                })),
                                                        disabled: isSending,
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                        lineNumber: 217,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, taskId, true, {
                                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                                lineNumber: 213,
                                                columnNumber: 21
                                            }, this);
                                        }
                                        return null;
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                lineNumber: 171,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].primaryButton,
                                type: "button",
                                //onClick={handleSetup}
                                disabled: isSending || !isUserInfoCompleteValue,
                                children: isSending ? "Starting Experiment…" : "Start Experiment"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/InitialPrompt.tsx",
                                lineNumber: 241,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/InitialPrompt.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/components/InitialPrompt.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/InitialPrompt.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/InitialPrompt.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_s(InitialPrompt, "iYtqtFxiJpLvy74j0uwnPUEuFkI=");
_c = InitialPrompt;
var _c;
__turbopack_context__.k.register(_c, "InitialPrompt");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/components/StudyWizard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudyWizard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/page.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$study$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/study-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$InitialPrompt$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/InitialPrompt.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function getProgress(step) {
    switch(step){
        case "initial-prompt":
            return 0;
        case "chat-section":
            return 1;
        case "survey-section":
            return 2;
        case "second-prompt":
            return 3;
        case "second-chat":
            return 4;
        case "second-survey":
            return 5;
        default:
            return 0;
    }
}
function StudyWizard() {
    _s();
    const currentStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$study$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudyStore"])({
        "StudyWizard.useStudyStore[currentStep]": (s)=>s.currentStep
    }["StudyWizard.useStudyStore[currentStep]"]);
    const setStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$study$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudyStore"])({
        "StudyWizard.useStudyStore[setStep]": (s)=>s.setStep
    }["StudyWizard.useStudyStore[setStep]"]);
    const progressIndex = getProgress(currentStep);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: currentStep == "initial-prompt" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$InitialPrompt$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/app/components/StudyWizard.tsx",
            lineNumber: 36,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/StudyWizard.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(StudyWizard, "kJSNBQ/cGAXlYSJwe+XB14Ad+E4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$study$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudyStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$study$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStudyStore"]
    ];
});
_c = StudyWizard;
var _c;
__turbopack_context__.k.register(_c, "StudyWizard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useHighlights$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/useHighlights.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$StudyWizard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/StudyWizard.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const ROLES = [
    {
        id: "MathTutor",
        label: "Math Tutor"
    },
    {
        id: "WritingGrammarExpert",
        label: "Writing / Grammar Expert"
    },
    {
        id: "SeniorSoftwareEngineerDebugger",
        label: "Senior Software Engineer (Debugging)"
    },
    {
        id: "EmailCoach",
        label: "Write an email to a recruiter"
    },
    {
        id: "ConceptCoach",
        label: "Explain something you know well"
    },
    {
        id: "InvestmentPortfolio",
        label: "Develop an investment portfolio"
    }
];
const FOLLOW_UPS = [
    {
        id: "EmailCoach",
        label: "What is a company that you would be interested in working at?"
    },
    {
        id: "ConceptCoach",
        label: "What is a subject that you know a lot about?"
    }
];
const GRADE_OPTIONS = [
    {
        id: "freshman",
        label: "Freshman"
    },
    {
        id: "sophomore",
        label: "Sophomore"
    },
    {
        id: "junior",
        label: "Junior"
    },
    {
        id: "senior",
        label: "Senior"
    },
    {
        id: "other",
        label: "Other"
    }
];
const AI_EXPERIENCE_OPTIONS = [
    {
        id: "yes",
        label: "Yes"
    },
    {
        id: "no",
        label: "No"
    }
];
const USER_INFO_STORAGE_KEY = "aiChatbotExperiment.userInfo.v1";
function isUserInfoComplete(userInfo) {
    const { name, grade, major, aiExperience, tasks } = userInfo ?? {};
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedMajor = typeof major === "string" ? major.trim() : "";
    const gradeSet = new Set(GRADE_OPTIONS.map((g)=>g.id));
    const isValidGrade = typeof grade === "string" && gradeSet.has(grade);
    const isValidAiExperience = aiExperience === "yes" || aiExperience === "no";
    const isValidTasks = tasks && tasks.length === 2;
    return Boolean(trimmedName && trimmedMajor && isValidGrade && isValidAiExperience && isValidTasks);
}
function formatTime(ts) {
    try {
        return new Date(ts).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    } catch  {
        return "";
    }
}
function Home() {
    _s();
    const [setupComplete, setSetupComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("plain");
    const [role, setRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(ROLES[0].id);
    const [setupInput, setSetupInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [grade, setGrade] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [major, setMajor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [aiExperience, setAiExperience] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSending, setIsSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showCommentsSidebar, setShowCommentsSidebar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [tasks, setStudyTasks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [followUpAnswers, setFollowUpAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const listRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { highlights, addHighlight, removeHighlight, updateHighlight, getHighlightsForMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useHighlights$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHighlights"])();
    const activeRole = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo[activeRole]": ()=>ROLES.find({
                "Home.useMemo[activeRole]": (r)=>r.id === role
            }["Home.useMemo[activeRole]"]) ?? ROLES[0]
    }["Home.useMemo[activeRole]"], [
        role
    ]);
    const isUserInfoCompleteValue = isUserInfoComplete({
        name,
        grade,
        major,
        aiExperience,
        tasks
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const el = listRef.current;
            if (!el) return;
            el.scrollTop = el.scrollHeight;
        }
    }["Home.useEffect"], [
        messages.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            // Restore saved user info so the user doesn't need to retype it on refresh.
            try {
                const raw = sessionStorage.getItem(USER_INFO_STORAGE_KEY);
                if (!raw) return;
                const parsed = JSON.parse(raw);
                if (!parsed || typeof parsed !== "object") return;
                setName(typeof parsed.name === "string" ? parsed.name : "");
                setGrade(typeof parsed.grade === "string" ? parsed.grade : "");
                setMajor(typeof parsed.major === "string" ? parsed.major : "");
                setAiExperience(typeof parsed.aiExperience === "string" ? parsed.aiExperience : "");
            } catch  {
            // If localStorage is unavailable or data is malformed, just start blank.
            }
        }
    }["Home.useEffect"], []);
    function areFollowUpsComplete(selectedTasks, answers) {
        return selectedTasks.every((taskId)=>!FOLLOW_UPS.some((f)=>f.id === taskId) || (answers[taskId]?.trim().length ?? 0) > 0);
    }
    function isTaskFollowUp(task) {
        return FOLLOW_UPS.some((f)=>f.id === task);
    }
    function createInitialMessage(task, followUpAnswer) {
        if (isTaskFollowUp(task)) {
            if (task === "EmailCoach") {
                const initMessage = `Can you help me write an email to a recruiter at ${followUpAnswer}?`;
                return initMessage;
            } else if (task === "ConceptCoach") {
                const initMessage = `Can you help me write a short paragraph explaining ${followUpAnswer}?`;
                return initMessage;
            }
        } else {
            return "Can you help me build a simple investment portfolio with $10,000?";
        }
    }
    async function handleSetup() {
        const trimmed = createInitialMessage(tasks[0], followUpAnswers[0]);
        // if (!trimmed || isSending) return;
        const checkFollowUps = areFollowUpsComplete(tasks, followUpAnswers);
        const userInfo = {
            name,
            grade,
            major,
            aiExperience,
            tasks
        };
        if (!isUserInfoComplete(userInfo)) {
            setError("Please complete all required user information fields before starting.");
            return;
        }
        const user = {
            name: name,
            grade: grade,
            major: major,
            aiUse: aiExperience === "yes" ? true : false,
            studyOne: null,
            studyTwo: null
        };
        console.log(`EXPERIMENT SETUP: Mode = ${mode.toUpperCase()}, Role = ${role}`);
        // Persist user info after validation succeeds.
        try {
            sessionStorage.setItem(USER_INFO_STORAGE_KEY, JSON.stringify(userInfo));
        } catch  {
        // Non-fatal: allow setup to continue even if storage fails.
        }
        try {
            const backRes = await fetch("/api/backend", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    codeVer: "1.1",
                    aiModel: "gemini-3-flash-preview",
                    company: "Google",
                    mode: mode,
                    role: mode === "role" ? role : "none",
                    name: name,
                    grade: grade,
                    major: major,
                    aiUse: aiExperience
                })
            });
            const backData = await backRes.json().catch(()=>null);
            if (!backRes.ok) {
                const message = backData?.error?.message || `Request failed (${backRes.status})`;
                throw new Error(message);
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Unexpected error sending user info to backend.";
            setError(msg);
        }
        setError(null);
        setIsSending(true);
        const userMsg = {
            id: crypto.randomUUID(),
            role: "user",
            content: trimmed,
            ts: Date.now()
        };
        setMessages([
            userMsg
        ]);
        setSetupComplete(true);
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    message: trimmed,
                    mode,
                    role: mode === "role" ? role : null,
                    history: []
                })
            });
            const data = await res.json().catch(()=>null);
            if (!res.ok) {
                const message = data?.error?.message || `Request failed (${res.status})`;
                throw new Error(message);
            }
            const assistantText = data?.assistant?.content;
            if (typeof assistantText !== "string" || assistantText.trim().length === 0) {
                throw new Error("Invalid response from server.");
            }
            setMessages((prev)=>[
                    ...prev,
                    {
                        id: crypto.randomUUID(),
                        role: "assistant",
                        content: assistantText,
                        ts: Date.now()
                    }
                ]);
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Unexpected error sending message.";
            setError(msg);
            setMessages((prev)=>[
                    ...prev,
                    {
                        id: crypto.randomUUID(),
                        role: "assistant",
                        content: "Sorry — something went wrong sending that message.",
                        ts: Date.now()
                    }
                ]);
        } finally{
            setIsSending(false);
        }
    }
    async function sendMessage() {
        const trimmed = input.trim();
        if (!trimmed || isSending) return;
        setError(null);
        setIsSending(true);
        const userMsg = {
            id: crypto.randomUUID(),
            role: "user",
            content: trimmed,
            ts: Date.now()
        };
        setMessages((prev)=>[
                ...prev,
                userMsg
            ]);
        setInput("");
        const history = messages.slice(-12).filter((m)=>m.role === "user" || m.role === "assistant").map((m)=>({
                role: m.role,
                content: m.content
            }));
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    message: trimmed,
                    mode,
                    role: mode === "role" ? role : null,
                    history
                })
            });
            const data = await res.json().catch(()=>null);
            if (!res.ok) {
                const message = data?.error?.message || `Request failed (${res.status})`;
                throw new Error(message);
            }
            const assistantText = data?.assistant?.content;
            if (typeof assistantText !== "string" || assistantText.trim().length === 0) {
                throw new Error("Invalid response from server.");
            }
            setMessages((prev)=>[
                    ...prev,
                    {
                        id: crypto.randomUUID(),
                        role: "assistant",
                        content: assistantText,
                        ts: Date.now()
                    }
                ]);
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Unexpected error sending message.";
            setError(msg);
            setMessages((prev)=>[
                    ...prev,
                    {
                        id: crypto.randomUUID(),
                        role: "assistant",
                        content: "Sorry — something went wrong sending that message.",
                        ts: Date.now()
                    }
                ]);
        } finally{
            setIsSending(false);
        }
    }
    function clearChat() {
        setError(null);
        setMessages([
            {
                id: crypto.randomUUID(),
                role: "assistant",
                content: "Chat cleared. Ask another question whenever you're ready.",
                ts: Date.now()
            }
        ]);
    }
    // Setup screen for experimenters
    // if (!setupComplete) {
    //   return (
    //     <div className={styles.page}>
    //       <main className={styles.shell}>
    //         <header className={styles.header}>
    //           <div className={styles.titleBlock}>
    //             <div className={styles.titleRow}>
    //               <h1 className={styles.title}>AI Chatbot Experiment</h1>
    //               <span className={styles.badge}>Setup</span>
    //             </div>
    //             <p className={styles.subtitle}>Configure the experiment and enter the initial prompt.</p>
    //           </div>
    //         </header>
    //         {error ? (
    //           <div className={styles.errorBanner} role="alert">
    //             <strong className={styles.errorTitle}>Error</strong>
    //             <span className={styles.errorText}>{error}</span>
    //           </div>
    //         ) : null}
    //         <section className={styles.chat}>
    //           <div className={styles.setupForm}>
    //             <div className={styles.setupSection}>
    //               <h2 className={styles.sectionTitle}>Your Information</h2>
    //               <div className={styles.configGroup}>
    //                 <label className={styles.configLabel} htmlFor="nameInput">
    //                   Name
    //                 </label>
    //                 <input
    //                   id="nameInput"
    //                   className={styles.textarea}
    //                   value={name}
    //                   placeholder="Enter your name"
    //                   onChange={(e) => setName(e.target.value)}
    //                   disabled={isSending}
    //                   required
    //                   type="text"
    //                 />
    //               </div>
    //               <div className={styles.configGroup}>
    //                 <label className={styles.configLabel} htmlFor="gradeSelect">
    //                   Grade
    //                 </label>
    //                 <select
    //                   id="gradeSelect"
    //                   className={styles.select}
    //                   value={grade}
    //                   onChange={(e) => setGrade(e.target.value)}
    //                   disabled={isSending}
    //                   required
    //                 >
    //                   <option value="" disabled>
    //                     Select grade...
    //                   </option>
    //                   {GRADE_OPTIONS.map((g) => (
    //                     <option key={g.id} value={g.id}>
    //                       {g.label}
    //                     </option>
    //                   ))}
    //                 </select>
    //               </div>
    //               <div className={styles.configGroup}>
    //                 <label className={styles.configLabel} htmlFor="majorInput">
    //                   Major
    //                 </label>
    //                 <input
    //                   id="majorInput"
    //                   className={styles.textarea}
    //                   value={major}
    //                   placeholder="Enter your major"
    //                   onChange={(e) => setMajor(e.target.value)}
    //                   disabled={isSending}
    //                   required
    //                   type="text"
    //                 />
    //               </div>
    //               <div className={styles.configGroup}>
    //                 <label className={styles.configLabel}>AI Experience</label>
    //                 <div className={styles.radioGroup}>
    //                   {AI_EXPERIENCE_OPTIONS.map((opt) => (
    //                     <label key={opt.id} className={styles.radioLabel}>
    //                       <input
    //                         type="radio"
    //                         name="aiExperience"
    //                         value={opt.id}
    //                         checked={aiExperience === opt.id}
    //                         onChange={(e) => setAiExperience(e.target.value)}
    //                         disabled={isSending}
    //                         required
    //                       />
    //                       <span>{opt.label}</span>
    //                     </label>
    //                   ))}
    //                 </div>
    //               </div>
    //             </div>
    //             <div className={styles.setupSection}>
    //               <h2 className={styles.sectionTitle}>Task Configuration</h2>
    //               <div className={styles.configGroup}>
    //                 <label className={styles.selectLabel} htmlFor="taskSelect">
    //                   Select Two Tasks
    //                 </label>
    //                 <div className={styles.radioGroup}>
    //                   {ROLES.map((r) => (
    //                     <label key={r.id} className={styles.radioLabel}>
    //                       <input
    //                         type="checkbox"
    //                         value={r.id}
    //                         checked={tasks.includes(r.id)}
    //                         disabled={isSending}
    //                         onChange={(e) => {
    //                           const { value, checked } = e.target;
    //                           const roleId = value as RoleId;
    //                           setStudyTasks((prev) => {
    //                             if (checked) {
    //                               if (prev.length < 2) {
    //                                 return [...prev, roleId];
    //                               }
    //                               return prev;
    //                             }
    //                             else {
    //                               return prev.filter((id) => id !== roleId);
    //                             }
    //                           })
    //                         }}
    //                       >
    //                       </input>
    //                       <span>{r.label}</span>
    //                     </label>
    //                   ))}
    //                 </div>
    //               </div>
    //               {tasks.map((taskId) => {
    //                 const followUp = FOLLOW_UPS.find((f) => f.id === taskId);
    //                 if (followUp) {
    //                   return (
    //                     <div key={taskId} className={styles.configGroup}>
    //                       <label className={styles.configLabel} htmlFor={`followUp-${taskId}`}>
    //                         {followUp.label}
    //                       </label>
    //                       <input
    //                         id={`followUp-${taskId}`}
    //                         className={styles.textarea}
    //                         type="text"
    //                         value={followUpAnswers[taskId] || ""}
    //                         placeholder="Enter your answer..."
    //                         onChange={(e) =>
    //                           setFollowUpAnswers((prev) => ({
    //                             ...prev,
    //                             [taskId]: e.target.value,
    //                           }))
    //                         }
    //                         disabled={isSending}
    //                         required
    //                       />
    //                     </div>
    //                   );
    //                 }
    //                 return null;
    //               })}
    //             </div>
    //             <button
    //               className={styles.primaryButton}
    //               type="button"
    //               onClick={handleSetup}
    //               disabled={isSending || !isUserInfoCompleteValue}
    //             >
    //               {isSending ? "Starting Experiment…" : "Start Experiment"}
    //             </button>
    //           </div>
    //         </section>
    //       </main>
    //     </div>
    //   );
    // }
    // Chat screen for users (after setup)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$StudyWizard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 577,
        columnNumber: 5
    }, this);
}
_s(Home, "YhbFsJQ5u9mGRrmGKQIH+uWnLuo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$useHighlights$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useHighlights"]
    ];
});
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/zustand/esm/vanilla.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createStore",
    ()=>createStore
]);
const createStoreImpl = (createState)=>{
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace)=>{
        const nextState = typeof partial === "function" ? partial(state) : partial;
        if (!Object.is(nextState, state)) {
            const previousState = state;
            state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
            listeners.forEach((listener)=>listener(state, previousState));
        }
    };
    const getState = ()=>state;
    const getInitialState = ()=>initialState;
    const subscribe = (listener)=>{
        listeners.add(listener);
        return ()=>listeners.delete(listener);
    };
    const api = {
        setState,
        getState,
        getInitialState,
        subscribe
    };
    const initialState = state = createState(setState, getState, api);
    return api;
};
const createStore = (createState)=>createState ? createStoreImpl(createState) : createStoreImpl;
;
}),
"[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "create",
    ()=>create,
    "useStore",
    ()=>useStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/vanilla.mjs [app-client] (ecmascript)");
;
;
const identity = (arg)=>arg;
function useStore(api, selector = identity) {
    const slice = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useSyncExternalStore(api.subscribe, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useStore.useSyncExternalStore[slice]": ()=>selector(api.getState())
    }["useStore.useSyncExternalStore[slice]"], [
        api,
        selector
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useStore.useSyncExternalStore[slice]": ()=>selector(api.getInitialState())
    }["useStore.useSyncExternalStore[slice]"], [
        api,
        selector
    ]));
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useDebugValue(slice);
    return slice;
}
const createImpl = (createState)=>{
    const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$vanilla$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createStore"])(createState);
    const useBoundStore = (selector)=>useStore(api, selector);
    Object.assign(useBoundStore, api);
    return useBoundStore;
};
const create = (createState)=>createState ? createImpl(createState) : createImpl;
;
}),
]);

//# sourceMappingURL=_22444630._.js.map