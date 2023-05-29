import { c as Y, a as E, l as k, u as x, t as Z, b as G, i as f, s as U, r as N, j as M, T as a, d as v, R as Q, P as W, m as R, e as B, f as P } from "./ThemeStyles.c0d84d2f.js";
import { u as X } from "./useDispatch.43a2a81a.js";
const l = {
  display: "loading",
  summary: {
    documentUri: "",
    subdocumentUris: [],
    errors: !1,
    invalid: !1,
    all: 0,
    datavalidation: { max: 0, value: 0 },
    security: { max: 0, value: 0 },
    oasconformance: { max: 0, value: 0 }
  },
  all: [],
  selected: [],
  kdb: {}
}, T = Y({
  name: "audit",
  initialState: l,
  reducers: {
    showFullReport: (i, o) => {
      i.display = "full", i.summary = o.payload.summary, i.all = i.selected = C(o.payload);
    },
    showPartialReport: (i, o) => {
      const c = C(o.payload.report), e = o.payload.ids.map((t) => `${o.payload.uri}-${t}`);
      i.display = "partial", i.summary = o.payload.report.summary, i.all = c, i.selected = c.filter((t) => e.includes(t.key));
    },
    goToFullReport: (i) => {
      i.display = "full", i.selected = i.all;
    },
    showNoReport: (i) => {
      i.display = "no-report", i.summary = l.summary, i.all = [], i.selected = [];
    },
    loadKdb: (i, o) => {
      i.kdb = o.payload;
    },
    goToLine: (i, o) => {
    },
    copyIssueId: (i, o) => {
    },
    openLink: (i, o) => {
    }
  }
});
function C(i) {
  return Object.entries(i.issues).map(([c, e]) => e.map((t, L) => ({
    ...t,
    key: `${c}-${L}`,
    filename: i.files[t.documentUri].relative
  }))).reduce((c, e) => c.concat(e), []);
}
const {
  showFullReport: y,
  showPartialReport: w,
  goToFullReport: D,
  showNoReport: p,
  loadKdb: J,
  goToLine: A,
  copyIssueId: z,
  openLink: m
} = T.actions, F = T.reducer, H = {
  audit: F,
  theme: Z
}, K = (i, o) => E({
  reducer: H,
  middleware: (c) => c().prepend(i.middleware).concat(k),
  preloadedState: {
    theme: o
  }
}), V = () => X(), r = x, S = G(), u = S.startListening;
function _(i) {
  const o = {
    goToLine: () => u({
      actionCreator: A,
      effect: async (c, e) => {
        i.postMessage({
          command: "goToLine",
          payload: c.payload
        });
      }
    }),
    copyIssueId: () => u({
      actionCreator: z,
      effect: async (c, e) => {
        i.postMessage({
          command: "copyIssueId",
          payload: c.payload
        });
      }
    }),
    openLink: () => u({
      actionCreator: m,
      effect: async (c, e) => {
        i.postMessage({
          command: "openLink",
          payload: c.payload
        });
      }
    })
  };
  return u({
    matcher: f(y, w, p, D),
    effect: async (c, e) => {
      window.scrollTo(0, 0);
    }
  }), U(o), S;
}
const b = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuNCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1NjYuOTMgMTkyLjIyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NjYuOTMgMTkyLjIyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzJEMkQyRDt9Cgkuc3Qxe2ZpbGw6IzdGNDg4RTt9Cgkuc3Qye2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNjMuMjIsOTYuMTRjMC0xMi44Nyw0LjA3LTIyLjcsMTIuMi0yOS40OWM4LjEzLTYuOCwxNy43MS0xMC4xOSwyOC43Mi0xMC4xOWM4Ljg1LDAsMTYuNDcsMS45MSwyMi44NSw1LjcxCglWNzcuM2MtNS43Ny00LjEyLTEyLjYxLTYuMTgtMjAuNTQtNi4xOGMtNy4zMSwwLTEzLjU0LDIuMDMtMTguNjgsNi4xYy01LjE1LDQuMDctNy43MiwxMC4xNy03LjcyLDE4LjMKCWMwLDcuOTMsMi41NSwxMy45OCw3LjY0LDE4LjE0YzUuMSw0LjE3LDExLjI1LDYuMjUsMTguNDUsNi4yNWM3LjgyLDAsMTUuMDMtMS45LDIxLjYyLTUuNzF2MTUuMjljLTcuMSwzLjQtMTUuMjksNS4xLTI0LjU1LDUuMQoJYy0xMC44MSwwLTIwLjE4LTMuMzItMjguMS05Ljk2QzE2Ny4xOCwxMTcuOTksMTYzLjIyLDEwOC40OSwxNjMuMjIsOTYuMTR6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yNDYuMTQsNzAuNjZjMi44OC00LjYzLDcuMTUtOC4yMywxMi44Mi0xMC44MWM1LjY2LTIuNTcsMTEuNzktMy41NSwxOC4zOC0yLjkzdjE2LjIxCgljLTYuNTktMC45My0xMi41Ni0wLjA1LTE3LjkxLDIuNjJjLTUuMzUsMi42OC05LjE2LDYuNjQtMTEuNDMsMTEuODl2NDQuOTRoLTE2LjUyVjU4LjQ2aDE0LjY3VjcwLjY2eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzE2LjgxLDU3Ljg4aDE2LjUydjc0LjEyaC0xNC42N3YtMTAuMTljLTYuNzksOC4xMy0xNS4zOSwxMi4yLTI1Ljc5LDEyLjJjLTkuNTcsMC0xNy4wNi0yLjc4LTIyLjQ3LTguMzQKCWMtNS40LTUuNTYtOC4xMS0xMi44Ny04LjExLTIxLjkzVjU3Ljg4aDE2LjUydjQzLjdjMCwxMS44NCw1Ljc2LDE3Ljc2LDE3LjI5LDE3Ljc2YzguMTMsMCwxNS4wMy00LjEyLDIwLjY5LTEyLjM1VjU3Ljg4eiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzUyLjIzLDY4LjA4YzYuOC04LjEzLDE1LjM5LTEyLjIsMjUuNzktMTIuMmM5LjI3LDAsMTYuNjgsMi44MSwyMi4yNCw4LjQyYzUuNTYsNS42MSw4LjM0LDEyLjg5LDguMzQsMjEuODUKCXY0NS44NmgtMTYuNTJ2LTQzLjdjMC01Ljc2LTEuNi0xMC4xNy00Ljc5LTEzLjJjLTMuMTktMy4wNC03LjM2LTQuNTYtMTIuNTEtNC41NmMtOC4xMywwLTE1LjAzLDQuMTItMjAuNjksMTIuMzV2NDkuMTFoLTE2LjUyCglWNTcuODhoMTQuNjdWNjguMDh6Ii8+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MTEuMzcsOTUuNTZjMC0xMi44Nyw0LjA3LTIyLjcsMTIuMi0yOS40OWM4LjEzLTYuOCwxNy43MS0xMC4xOSwyOC43Mi0xMC4xOWM4Ljg1LDAsMTYuNDcsMS45MSwyMi44NSw1LjcxCgl2MTUuMTNjLTUuNzctNC4xMi0xMi42MS02LjE4LTIwLjU0LTYuMThjLTcuMzEsMC0xMy41NCwyLjAzLTE4LjY4LDYuMWMtNS4xNSw0LjA3LTcuNzIsMTAuMTctNy43MiwxOC4zCgljMCw3LjkzLDIuNTUsMTMuOTgsNy42NCwxOC4xNHMxMS4yNSw2LjI1LDE4LjQ1LDYuMjVjNy44MiwwLDE1LjAzLTEuOSwyMS42Mi01LjcxdjE1LjI5Yy03LjEsMy40LTE1LjI5LDUuMS0yNC41NSw1LjEKCWMtMTAuODEsMC0yMC4xOC0zLjMyLTI4LjExLTkuOTZDNDE1LjMzLDExNy40MSw0MTEuMzcsMTA3LjkyLDQxMS4zNyw5NS41NnoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQ3OS42MiwyMy45MWgxNi41MnY0Mi4xNmM2LjU5LTYuOCwxNC41Ny0xMC4xOSwyMy45NC0xMC4xOWM5LjI3LDAsMTYuNjgsMi44MSwyMi4yNCw4LjQyCgljNS41Niw1LjYxLDguMzQsMTIuODksOC4zNCwyMS44NXY0NS44NmgtMTYuNTJ2LTQzLjdjMC01Ljc2LTEuNi0xMC4xNy00Ljc5LTEzLjJjLTMuMTktMy4wNC03LjM2LTQuNTYtMTIuNTEtNC41NgoJYy04LjEzLDAtMTUuMDMsNC4xMi0yMC42OSwxMi4zNXY0OS4xMWgtMTYuNTJWMjMuOTF6Ii8+Cjxwb2x5Z29uIGNsYXNzPSJzdDEiIHBvaW50cz0iMTU0Ljk0LDEzNi43MSAxNTQuOTQsNTMuMjYgODIuNjcsMTEuNTQgMTAuNCw1My4yNiAxMC40LDEzNi43MSA4Mi42NywxNzguNDQgIi8+CjxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik03MS4wMiw3Ny4wNGgxMS42MXY0My44OGgwLjE0djkuODNoLTAuMTR2MTMuOEg3MS43MnYtMTMuOEgzNS4wOXYtOS42M0w3MS4wMiw3Ny4wNHogTTcxLjcyLDEyMC45MVY5MS40MgoJbC0yNC4wNCwyOS40OUg3MS43MnoiLz4KPHBhdGggY2xhc3M9InN0MiIgZD0iTTgyLjA2LDU3LjFjNi42OC00LjU3LDE0LjE2LTYuODUsMjIuNDQtNi44NWM3LjA4LDAsMTIuODEsMS42NCwxNy4xNyw0LjkxYzQuMzcsMy4yOCw2LjU1LDcuOTYsNi41NSwxNC4wNQoJYzAsNS4wNS0xLjY4LDkuMzYtNS4wNSwxMi45M2MtMy4zNywzLjU3LTcuOTUsNy4wNy0xMy43NSwxMC40N2MtMC40NSwwLjI4LTEuMjksMC43OS0yLjUsMS41NGMtMS4yMiwwLjc1LTIuMDgsMS4yOC0yLjU5LDEuNTkKCWMtMC41MSwwLjMxLTEuMjksMC43OS0yLjMzLDEuNDNjLTEuMDUsMC42NC0xLjgyLDEuMTItMi4zMywxLjQzYy0wLjUxLDAuMzEtMS4xNywwLjc5LTIsMS40M2MtMC44MiwwLjY0LTEuNDMsMS4xOC0xLjgyLDEuNjIKCWMtMC4zOSwwLjQ0LTAuODUsMC45OC0xLjM4LDEuNjJjLTAuNTMsMC42NC0wLjksMS4yMy0xLjEzLDEuNzdjLTAuMjMsMC41NC0wLjQ0LDEuMTUtMC42NCwxLjgzYy0wLjIsMC42OC0wLjMsMS4zNS0wLjMsMi4wMwoJbDM2LjE5LTAuMXYxMC4yM2gtNDguOHYtNS4xNmMwLTguNiwzLjY0LTE1Ljc1LDEwLjkyLTIxLjQ0YzIuMDMtMS41Myw1Ljg0LTMuOTksMTEuNDEtNy4zOWM1LjYxLTMuMjIsOS4yMi01LjU2LDEwLjgzLTcuMDEKCWMyLjY1LTIuNTgsMy45Ny01LjQ2LDMuOTctOC42NGMwLTIuOTEtMS4xOC01LjEzLTMuNTItNi42NWMtMi4zNS0xLjUyLTUuNjQtMi4yOC05Ljg4LTIuMjhjLTcuMzUsMC0xNC40OSwyLjUyLTIxLjQ0LDcuNTRWNTcuMXoiLz4KPC9zdmc+Cg==", h = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0iTGF5ZXJfMSIKICAgeD0iMHB4IgogICB5PSIwcHgiCiAgIHZpZXdCb3g9IjAgMCA1NjYuOTMgMTkyLjIyIgogICBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NjYuOTMgMTkyLjIyOyIKICAgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIKICAgc29kaXBvZGk6ZG9jbmFtZT0ibG9nby5zdmciCiAgIGlua3NjYXBlOmV4cG9ydC1maWxlbmFtZT0iL1VzZXJzL2FudG9uL0Rvd25sb2Fkcy80MmNfc3RhbmRhcmQucG5nIgogICBpbmtzY2FwZTpleHBvcnQteGRwaT0iMjQuODc5OTk5IgogICBpbmtzY2FwZTpleHBvcnQteWRwaT0iMjQuODc5OTk5IgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjAuMiAoZTg2Yzg3MDgsIDIwMjEtMDEtMTUpIj48bWV0YWRhdGEKICAgaWQ9Im1ldGFkYXRhMTQzIj48cmRmOlJERj48Y2M6V29yawogICAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlCiAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+PGRjOnRpdGxlPjwvZGM6dGl0bGU+PC9jYzpXb3JrPjwvcmRmOlJERj48L21ldGFkYXRhPjxkZWZzCiAgIGlkPSJkZWZzMTQxIiAvPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgb2JqZWN0dG9sZXJhbmNlPSIxMCIKICAgZ3JpZHRvbGVyYW5jZT0iMTAiCiAgIGd1aWRldG9sZXJhbmNlPSIxMCIKICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTQ0MCIKICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iODU1IgogICBpZD0ibmFtZWR2aWV3MTM5IgogICBzaG93Z3JpZD0iZmFsc2UiCiAgIGlua3NjYXBlOnpvb209IjAuOTY3NDkxNTgiCiAgIGlua3NjYXBlOmN4PSIxMTcuNTcyMDgiCiAgIGlua3NjYXBlOmN5PSI5My4wMDkxOTgiCiAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICBpbmtzY2FwZTp3aW5kb3cteT0iMjMiCiAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9IkxheWVyXzEiIC8+CjxzdHlsZQogICB0eXBlPSJ0ZXh0L2NzcyIKICAgaWQ9InN0eWxlMTE4Ij4KCS5zdDB7ZmlsbDojMkQyRDJEO30KCS5zdDF7ZmlsbDojN0Y0ODhFO30KCS5zdDJ7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPHBhdGgKICAgY2xhc3M9InN0MCIKICAgZD0iTTE2My4yMiw5Ni4xNGMwLTEyLjg3LDQuMDctMjIuNywxMi4yLTI5LjQ5YzguMTMtNi44LDE3LjcxLTEwLjE5LDI4LjcyLTEwLjE5YzguODUsMCwxNi40NywxLjkxLDIyLjg1LDUuNzEgIFY3Ny4zYy01Ljc3LTQuMTItMTIuNjEtNi4xOC0yMC41NC02LjE4Yy03LjMxLDAtMTMuNTQsMi4wMy0xOC42OCw2LjFjLTUuMTUsNC4wNy03LjcyLDEwLjE3LTcuNzIsMTguMyAgYzAsNy45MywyLjU1LDEzLjk4LDcuNjQsMTguMTRjNS4xLDQuMTcsMTEuMjUsNi4yNSwxOC40NSw2LjI1YzcuODIsMCwxNS4wMy0xLjksMjEuNjItNS43MXYxNS4yOWMtNy4xLDMuNC0xNS4yOSw1LjEtMjQuNTUsNS4xICBjLTEwLjgxLDAtMjAuMTgtMy4zMi0yOC4xLTkuOTZDMTY3LjE4LDExNy45OSwxNjMuMjIsMTA4LjQ5LDE2My4yMiw5Ni4xNHoiCiAgIGlkPSJwYXRoMTIwIgogICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxIiAvPgo8cGF0aAogICBjbGFzcz0ic3QwIgogICBkPSJNMjQ2LjE0LDcwLjY2YzIuODgtNC42Myw3LjE1LTguMjMsMTIuODItMTAuODFjNS42Ni0yLjU3LDExLjc5LTMuNTUsMTguMzgtMi45M3YxNi4yMSAgYy02LjU5LTAuOTMtMTIuNTYtMC4wNS0xNy45MSwyLjYyYy01LjM1LDIuNjgtOS4xNiw2LjY0LTExLjQzLDExLjg5djQ0Ljk0aC0xNi41MlY1OC40NmgxNC42N1Y3MC42NnoiCiAgIGlkPSJwYXRoMTIyIgogICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxIiAvPgo8cGF0aAogICBjbGFzcz0ic3QwIgogICBkPSJNMzE2LjgxLDU3Ljg4aDE2LjUydjc0LjEyaC0xNC42N3YtMTAuMTljLTYuNzksOC4xMy0xNS4zOSwxMi4yLTI1Ljc5LDEyLjJjLTkuNTcsMC0xNy4wNi0yLjc4LTIyLjQ3LTguMzQgIGMtNS40LTUuNTYtOC4xMS0xMi44Ny04LjExLTIxLjkzVjU3Ljg4aDE2LjUydjQzLjdjMCwxMS44NCw1Ljc2LDE3Ljc2LDE3LjI5LDE3Ljc2YzguMTMsMCwxNS4wMy00LjEyLDIwLjY5LTEyLjM1VjU3Ljg4eiIKICAgaWQ9InBhdGgxMjQiCiAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjEiIC8+CjxwYXRoCiAgIGNsYXNzPSJzdDAiCiAgIGQ9Ik0zNTIuMjMsNjguMDhjNi44LTguMTMsMTUuMzktMTIuMiwyNS43OS0xMi4yYzkuMjcsMCwxNi42OCwyLjgxLDIyLjI0LDguNDJjNS41Niw1LjYxLDguMzQsMTIuODksOC4zNCwyMS44NSAgdjQ1Ljg2aC0xNi41MnYtNDMuN2MwLTUuNzYtMS42LTEwLjE3LTQuNzktMTMuMmMtMy4xOS0zLjA0LTcuMzYtNC41Ni0xMi41MS00LjU2Yy04LjEzLDAtMTUuMDMsNC4xMi0yMC42OSwxMi4zNXY0OS4xMWgtMTYuNTIgIFY1Ny44OGgxNC42N1Y2OC4wOHoiCiAgIGlkPSJwYXRoMTI2IgogICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxIiAvPgo8cGF0aAogICBjbGFzcz0ic3QwIgogICBkPSJNNDExLjM3LDk1LjU2YzAtMTIuODcsNC4wNy0yMi43LDEyLjItMjkuNDljOC4xMy02LjgsMTcuNzEtMTAuMTksMjguNzItMTAuMTljOC44NSwwLDE2LjQ3LDEuOTEsMjIuODUsNS43MSAgdjE1LjEzYy01Ljc3LTQuMTItMTIuNjEtNi4xOC0yMC41NC02LjE4Yy03LjMxLDAtMTMuNTQsMi4wMy0xOC42OCw2LjFjLTUuMTUsNC4wNy03LjcyLDEwLjE3LTcuNzIsMTguMyAgYzAsNy45MywyLjU1LDEzLjk4LDcuNjQsMTguMTRzMTEuMjUsNi4yNSwxOC40NSw2LjI1YzcuODIsMCwxNS4wMy0xLjksMjEuNjItNS43MXYxNS4yOWMtNy4xLDMuNC0xNS4yOSw1LjEtMjQuNTUsNS4xICBjLTEwLjgxLDAtMjAuMTgtMy4zMi0yOC4xMS05Ljk2QzQxNS4zMywxMTcuNDEsNDExLjM3LDEwNy45Miw0MTEuMzcsOTUuNTZ6IgogICBpZD0icGF0aDEyOCIKICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MSIgLz4KPHBhdGgKICAgY2xhc3M9InN0MCIKICAgZD0iTTQ3OS42MiwyMy45MWgxNi41MnY0Mi4xNmM2LjU5LTYuOCwxNC41Ny0xMC4xOSwyMy45NC0xMC4xOWM5LjI3LDAsMTYuNjgsMi44MSwyMi4yNCw4LjQyICBjNS41Niw1LjYxLDguMzQsMTIuODksOC4zNCwyMS44NXY0NS44NmgtMTYuNTJ2LTQzLjdjMC01Ljc2LTEuNi0xMC4xNy00Ljc5LTEzLjJjLTMuMTktMy4wNC03LjM2LTQuNTYtMTIuNTEtNC41NiAgYy04LjEzLDAtMTUuMDMsNC4xMi0yMC42OSwxMi4zNXY0OS4xMWgtMTYuNTJWMjMuOTF6IgogICBpZD0icGF0aDEzMCIKICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MSIgLz4KPHBvbHlnb24KICAgY2xhc3M9InN0MSIKICAgcG9pbnRzPSIxNTQuOTQsMTM2LjcxIDE1NC45NCw1My4yNiA4Mi42NywxMS41NCAxMC40LDUzLjI2IDEwLjQsMTM2LjcxIDgyLjY3LDE3OC40NCAiCiAgIGlkPSJwb2x5Z29uMTMyIiAvPgo8cGF0aAogICBjbGFzcz0ic3QyIgogICBkPSJNNzEuMDIsNzcuMDRoMTEuNjF2NDMuODhoMC4xNHY5LjgzaC0wLjE0djEzLjhINzEuNzJ2LTEzLjhIMzUuMDl2LTkuNjNMNzEuMDIsNzcuMDR6IE03MS43MiwxMjAuOTFWOTEuNDIgIGwtMjQuMDQsMjkuNDlINzEuNzJ6IgogICBpZD0icGF0aDEzNCIgLz4KPHBhdGgKICAgY2xhc3M9InN0MiIKICAgZD0iTTgyLjA2LDU3LjFjNi42OC00LjU3LDE0LjE2LTYuODUsMjIuNDQtNi44NWM3LjA4LDAsMTIuODEsMS42NCwxNy4xNyw0LjkxYzQuMzcsMy4yOCw2LjU1LDcuOTYsNi41NSwxNC4wNSAgYzAsNS4wNS0xLjY4LDkuMzYtNS4wNSwxMi45M2MtMy4zNywzLjU3LTcuOTUsNy4wNy0xMy43NSwxMC40N2MtMC40NSwwLjI4LTEuMjksMC43OS0yLjUsMS41NGMtMS4yMiwwLjc1LTIuMDgsMS4yOC0yLjU5LDEuNTkgIGMtMC41MSwwLjMxLTEuMjksMC43OS0yLjMzLDEuNDNjLTEuMDUsMC42NC0xLjgyLDEuMTItMi4zMywxLjQzYy0wLjUxLDAuMzEtMS4xNywwLjc5LTIsMS40M2MtMC44MiwwLjY0LTEuNDMsMS4xOC0xLjgyLDEuNjIgIGMtMC4zOSwwLjQ0LTAuODUsMC45OC0xLjM4LDEuNjJjLTAuNTMsMC42NC0wLjksMS4yMy0xLjEzLDEuNzdjLTAuMjMsMC41NC0wLjQ0LDEuMTUtMC42NCwxLjgzYy0wLjIsMC42OC0wLjMsMS4zNS0wLjMsMi4wMyAgbDM2LjE5LTAuMXYxMC4yM2gtNDguOHYtNS4xNmMwLTguNiwzLjY0LTE1Ljc1LDEwLjkyLTIxLjQ0YzIuMDMtMS41Myw1Ljg0LTMuOTksMTEuNDEtNy4zOWM1LjYxLTMuMjIsOS4yMi01LjU2LDEwLjgzLTcuMDEgIGMyLjY1LTIuNTgsMy45Ny01LjQ2LDMuOTctOC42NGMwLTIuOTEtMS4xOC01LjEzLTMuNTItNi42NWMtMi4zNS0xLjUyLTUuNjQtMi4yOC05Ljg4LTIuMjhjLTcuMzUsMC0xNC40OSwyLjUyLTIxLjQ0LDcuNTRWNTcuMXoiCiAgIGlkPSJwYXRoMTM2IiAvPgo8L3N2Zz4K";
function $({
  openLink: i,
  themeKind: o
}) {
  const [c, e] = N.useState(!1), t = () => {
    e(!c);
  }, L = (j) => {
    i(j.currentTarget.href), j.preventDefault(), j.stopPropagation();
  };
  return /* @__PURE__ */ M.jsx("div", { className: "c_header", children: /* @__PURE__ */ M.jsxs("div", { className: "d-flex justify-content-between", children: [
    /* @__PURE__ */ M.jsxs("div", { children: [
      /* @__PURE__ */ M.jsx("span", { className: "font-weight-bold", style: { display: "inline-block", height: "100%" }, children: "Powered by" }),
      /* @__PURE__ */ M.jsx("span", { children: /* @__PURE__ */ M.jsx("a", { href: "https://www.42crunch.com", onClick: L, children: /* @__PURE__ */ M.jsx("img", { src: o === "light" ? b : h }) }) })
    ] }),
    /* @__PURE__ */ M.jsx("div", { children: /* @__PURE__ */ M.jsxs("div", { className: "dropdown", children: [
      /* @__PURE__ */ M.jsx("button", { className: "dropbtn", onClick: t, children: "Learn More" }),
      /* @__PURE__ */ M.jsxs("div", { className: c ? "dropdown-content show" : "dropdown-content", children: [
        /* @__PURE__ */ M.jsx("a", { href: "https://42crunch.com/api-security-audit/", onClick: L, children: "API Contract Security Audit" }),
        /* @__PURE__ */ M.jsx("a", { href: "https://42crunch.com/api-conformance-scan/", onClick: L, children: "API Contract Conformance Scan" }),
        /* @__PURE__ */ M.jsx("a", { href: "https://42crunch.com/micro-api-firewall-protection/", onClick: L, children: "API Protection" })
      ] })
    ] }) })
  ] }) });
}
function q({ openLink: i }) {
  const o = (e) => {
    i(e.currentTarget.href), e.preventDefault(), e.stopPropagation();
  }, c = x((e) => e.audit.summary);
  return c.all === 0 && c.invalid ? /* @__PURE__ */ M.jsxs(M.Fragment, { children: [
    /* @__PURE__ */ M.jsx("h1", { children: "Failed to perform security audit, the OpenAPI file is invalid or too large." }),
    /* @__PURE__ */ M.jsx("div", { children: /* @__PURE__ */ M.jsxs("small", { children: [
      "Please submit your feedback for the security audit",
      " ",
      /* @__PURE__ */ M.jsx("a", { onClick: o, href: "https://github.com/42Crunch/vscode-openapi/issues", children: "here" })
    ] }) })
  ] }) : /* @__PURE__ */ M.jsxs("div", { className: "c_roundedbox", children: [
    /* @__PURE__ */ M.jsxs("h1", { children: [
      "Security audit score: ",
      /* @__PURE__ */ M.jsxs("span", { children: [
        c.all,
        " / 100"
      ] })
    ] }),
    /* @__PURE__ */ M.jsx("div", { className: "progress-bar-holder", children: /* @__PURE__ */ M.jsx("div", { className: "progress-bar bar-red", style: { width: `${c.all}%` } }) }),
    /* @__PURE__ */ M.jsxs("h3", { children: [
      "Security:",
      " ",
      /* @__PURE__ */ M.jsxs("span", { children: [
        c.security.value,
        " / ",
        c.security.max
      ] })
    ] }),
    /* @__PURE__ */ M.jsxs("h3", { children: [
      "Data validation:",
      " ",
      /* @__PURE__ */ M.jsxs("span", { children: [
        c.datavalidation.value,
        " / ",
        c.datavalidation.max
      ] })
    ] }),
    /* @__PURE__ */ M.jsx("div", { children: /* @__PURE__ */ M.jsxs("small", { children: [
      "Please submit your feedback for the security audit",
      " ",
      /* @__PURE__ */ M.jsx("a", { onClick: o, href: "https://github.com/42Crunch/vscode-openapi/issues", children: "here" })
    ] }) })
  ] });
}
function MM({
  openLink: i,
  themeKind: o
}) {
  const [c, e] = N.useState(!1), t = (j) => {
    i(j.currentTarget.href), j.preventDefault(), j.stopPropagation();
  }, L = () => {
    e(!c);
  };
  return /* @__PURE__ */ M.jsx("div", { className: "c_footer", children: /* @__PURE__ */ M.jsxs("div", { className: "d-flex justify-content-between", children: [
    /* @__PURE__ */ M.jsxs("div", { children: [
      /* @__PURE__ */ M.jsx("span", { className: "font-weight-bold", style: { display: "inline-block", height: "100%" }, children: "Powered by" }),
      /* @__PURE__ */ M.jsx("span", { children: /* @__PURE__ */ M.jsx("a", { href: "https://www.42crunch.com", onClick: t, children: /* @__PURE__ */ M.jsx("img", { src: o === "light" ? b : h }) }) })
    ] }),
    /* @__PURE__ */ M.jsx("div", { children: /* @__PURE__ */ M.jsxs("div", { className: "dropdown", children: [
      /* @__PURE__ */ M.jsx("button", { className: "dropbtn", onClick: L, children: "Learn More" }),
      /* @__PURE__ */ M.jsxs("div", { className: c ? "dropdown-content show" : "dropdown-content", children: [
        /* @__PURE__ */ M.jsx("a", { href: "https://42crunch.com/api-security-audit/", onClick: t, children: "API Contract Security Audit" }),
        /* @__PURE__ */ M.jsx("a", { href: "https://42crunch.com/api-conformance-scan/", onClick: t, children: "API Contract Conformance Scan" }),
        /* @__PURE__ */ M.jsx("a", { href: "https://42crunch.com/micro-api-firewall-protection/", onClick: t, children: "API Protection" })
      ] })
    ] }) })
  ] }) });
}
function iM({
  articleId: i,
  kdb: o,
  lang: c,
  openLink: e
}) {
  const t = (g) => {
    g.stopPropagation(), g.preventDefault(), e(g.target.href);
  }, L = N.useRef(null);
  N.useEffect(() => {
    const g = L.current.querySelectorAll("a");
    return g.forEach((s) => {
      s.addEventListener("click", t);
    }), () => {
      g.forEach((s) => {
        s.removeEventListener("click", t);
      });
    };
  });
  const j = o[i] || oM, I = [
    j ? j.description.text : "",
    d(j.example, c),
    d(j.exploit, c),
    d(j.remediation, c)
  ].join("");
  return /* @__PURE__ */ M.jsx("div", { ref: L, dangerouslySetInnerHTML: { __html: I } });
}
function d(i, o) {
  return !i || !i.sections ? "" : i.sections.map((c) => {
    if (c.text)
      return c.text;
    if (c.code)
      return `<pre>${c.code[o]}</pre>`;
  }).join("");
}
const oM = {
  description: {
    text: `<p>Whoops! Looks like there has been an oversight and we are missing a page for this issue.</p>
           <p><a href="https://apisecurity.io/contact-us/">Let us know</a> the title of the issue, and we make sure to add it to the encyclopedia.</p>`
  }
}, cM = (i) => /* @__PURE__ */ N.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", width: "1em", height: "1em", ...i }, /* @__PURE__ */ N.createElement("path", { d: "M6.101 359.293L25.9 379.092c4.686 4.686 12.284 4.686 16.971 0L224 198.393l181.13 180.698c4.686 4.686 12.284 4.686 16.971 0l19.799-19.799c4.686-4.686 4.686-12.284 0-16.971L232.485 132.908c-4.686-4.686-12.284-4.686-16.971 0L6.101 342.322c-4.687 4.687-4.687 12.285 0 16.971z" })), eM = (i) => /* @__PURE__ */ N.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", width: "1em", height: "1em", ...i }, /* @__PURE__ */ N.createElement("path", { d: "M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z" }));
function tM({
  kdb: i,
  issue: o,
  goToLine: c,
  copyIssueId: e,
  openLink: t
}) {
  const [L, j] = N.useState(!1), I = () => j(!L), g = o.displayScore !== "0" ? `Score impact: ${o.displayScore}` : "", s = o.filename.toLowerCase().endsWith(".yaml") || o.filename.toLowerCase().endsWith("yml") ? "yaml" : "json";
  return /* @__PURE__ */ M.jsxs("div", { className: "c_roundedbox_section", children: [
    /* @__PURE__ */ M.jsxs("h2", { onClick: I, style: { cursor: "pointer" }, children: [
      L ? /* @__PURE__ */ M.jsx(
        cM,
        {
          style: {
            width: 16,
            height: 16,
            marginRight: 6,
            fill: `var(${a.foreground})`
          }
        }
      ) : /* @__PURE__ */ M.jsx(
        eM,
        {
          style: {
            width: 16,
            height: 16,
            marginRight: 6,
            fill: `var(${a.foreground})`
          }
        }
      ),
      o.description
    ] }),
    /* @__PURE__ */ M.jsx("p", { children: /* @__PURE__ */ M.jsxs("small", { children: [
      "Issue ID:",
      " ",
      /* @__PURE__ */ M.jsx(
        "span",
        {
          className: "issue-id",
          onClick: (n) => {
            e(o.id);
          },
          children: o.id
        }
      )
    ] }) }),
    /* @__PURE__ */ M.jsx("p", { children: /* @__PURE__ */ M.jsxs("small", { children: [
      /* @__PURE__ */ M.jsxs(
        "a",
        {
          className: "focus-line",
          href: "#",
          onClick: (n) => {
            c(o.documentUri, o.lineNo, o.pointer), n.preventDefault(), n.stopPropagation();
          },
          children: [
            o.filename,
            ":",
            o.lineNo + 1
          ]
        }
      ),
      ". Severity: ",
      sM[o.criticality],
      ". ",
      g
    ] }) }),
    L && /* @__PURE__ */ M.jsx(iM, { kdb: i, articleId: o.id, lang: s, openLink: t })
  ] });
}
const sM = {
  5: "Critical",
  4: "High",
  3: "Medium",
  2: "Low",
  1: "Info"
};
function LM({ goToFullReport: i }) {
  return /* @__PURE__ */ M.jsx("h6", { children: /* @__PURE__ */ M.jsx(
    "a",
    {
      className: "go-full-report",
      href: "#",
      onClick: (o) => {
        i(), o.preventDefault(), o.stopPropagation();
      },
      children: "Go back to full report"
    }
  ) });
}
const jM = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgaWQ9IkxheWVyXzEiCiAgIGRhdGEtbmFtZT0iTGF5ZXIgMSIKICAgdmlld0JveD0iMCAwIDE2IDE2IgogICB2ZXJzaW9uPSIxLjEiCiAgIHNvZGlwb2RpOmRvY25hbWU9IjQyY3J1bmNoX2ljb24uc3ZnIgogICB3aWR0aD0iMTYiCiAgIGhlaWdodD0iMTYiCiAgIGlua3NjYXBlOnZlcnNpb249IjEuMHJjMSAoMDk5NjBkNiwgMjAyMC0wNC0wOSkiPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTI1Ij4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZT5sb2dvX2ljb248L2RjOnRpdGxlPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtcm90YXRpb249IjAiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgb2JqZWN0dG9sZXJhbmNlPSIxMCIKICAgICBncmlkdG9sZXJhbmNlPSIxMCIKICAgICBndWlkZXRvbGVyYW5jZT0iMTAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE0NDAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iODU1IgogICAgIGlkPSJuYW1lZHZpZXcyMyIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iMTYiCiAgICAgaW5rc2NhcGU6Y3g9IjIuNzI3NTkzMiIKICAgICBpbmtzY2FwZTpjeT0iMTMuNDAzNzQyIgogICAgIGlua3NjYXBlOndpbmRvdy14PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIyMyIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIwIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9IkxheWVyXzEiIC8+CiAgPGRlZnMKICAgICBpZD0iZGVmczEyIj4KICAgIDxzdHlsZQogICAgICAgaWQ9InN0eWxlMTAiPi5jbHMtMXtmaWxsOiM3ZTQ4OGY7fS5jbHMtMntmaWxsOiNmZmY7fTwvc3R5bGU+CiAgPC9kZWZzPgogIDx0aXRsZQogICAgIGlkPSJ0aXRsZTE0Ij5sb2dvX2ljb248L3RpdGxlPgogIDxwb2x5Z29uCiAgICAgY2xhc3M9ImNscy0xIgogICAgIHBvaW50cz0iMCwyMDQuODkgNzAuMiwyNDUuNDIgMTQwLjQsMjA0Ljg5IDE0MC40LDEyMy44MyA3MC4yLDgzLjMgMCwxMjMuODMgIgogICAgIGlkPSJwb2x5Z29uMTYiCiAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC4wOTc5ODIwOCwwLDAsMC4wOTc5ODIwOCwxLjEyMTY1OCwtOC4xMDQzMzQ3KSIgLz4KICA8dGV4dAogICAgIHg9Ii0yMjYuMTg5OTkiCiAgICAgeT0iLTI5Ny45MjQwMSIKICAgICBpZD0idGV4dDE4IiAvPgogIDxwYXRoCiAgICAgc3R5bGU9InN0cm9rZS13aWR0aDowLjA5NDUiCiAgICAgY2xhc3M9ImNscy0yIgogICAgIGQ9Ik0gMTAuODc2NTgsMTEuNDQzMTMgQSAxLjc4MzIxNSwxLjc4MzIxNSAwIDAgMSAxMC4zNDQ1NDUsMTEuMzYzNzUgMS41NjMwMywxLjU2MzAzIDAgMCAxIDkuODgwNTUsMTEuMTMxMjggMS4wNzI1NzUsMS4wNzI1NzUgMCAwIDEgOS41NDg4NTUsMTAuNzIzMDQgMS4zMjg2NywxLjMyODY3IDAgMCAxIDkuNDI1MDYsMTAuMTM4MDg1IHEgMCwtMC42OTM2MzEgMC40MjYxOTUsLTEuMDQ4OTUxIGEgMS41NDc5MSwxLjU0NzkxIDAgMCAxIDEuMDI1MzI1LC0wLjM1NTMyIDEuNjI4MjM1LDEuNjI4MjM1IDAgMCAxIDEuMDI5MTA1LDAuMzI0MTM1IFYgOC4yMTc4NDQgYSAyLjU4NDU3NSwyLjU4NDU3NSAwIDAgMCAtMS4xNTg1NywtMC4yNjM2NTUgdiAwIGwgLTIuNTg3NDEsMC4wMDc1NiBhIDAuNTEzMTM1LDAuNTEzMTM1IDAgMCAxIDAuMDIwNzksLTAuMTQ1NTMgMS4xODU5NzUsMS4xODU5NzUgMCAwIDEgMC4wNDUzNiwtMC4xMzA0MSAwLjU0MjQzLDAuNTQyNDMgMCAwIDEgMC4wODEyNywtMC4xMjY2MyBxIDAuMDU2NywtMC4wNjg5ODUgMC4wOTQ1LC0wLjExNjIzNSBBIDEuMDM5NSwxLjAzOTUgMCAwIDEgOC41MzIwMzUsNy4zMjY3MDkgMS42NzczNzUsMS42NzczNzUgMCAwIDEgOC42NzQ3Myw3LjIyNDY0OSBsIDAuMTY3MjY1LC0wLjEwMjA2IDAuMTY2MzIsLTAuMTAyMDYgMC4xODksLTAuMTEzNCAwLjE3ODYwNSwtMC4xMDk2MiBhIDQuNDMxMTA1LDQuNDMxMTA1IDAgMCAwIDAuOTgzNzQ1LC0wLjc0OTM4NSAxLjMwMDMyLDEuMzAwMzIgMCAwIDAgMC4zNjA5OSwtMC45MjUxNTUgcSAwLC0wLjY1Mjk5NSAtMC40NzI1LC0xLjAwNDUzNSAtMC40NzI1LC0wLjM1MTU0IC0xLjIyODUsLTAuMzUxNTQgYSAyLjc3OTI0NSwyLjc3OTI0NSAwIDAgMCAtMS42MDY1LDAuNDg5NTEgdiAwLjc3Njc5IFEgOC4xNTg3Niw0LjQ5MzU5OSA4Ljk0NTk0NSw0LjQ5MzU5OSBhIDEuMjk0NjUsMS4yOTQ2NSAwIDAgMSAwLjcwNTkxNSwwLjE2MzQ4NSAwLjUzMjAzNSwwLjUzMjAzNSAwIDAgMSAwLjI1MjMxNSwwLjQ3MjUgMC44NTA1LDAuODUwNSAwIDAgMSAtMC4yODM1LDAuNjE3MDg1IDUuMzk5NzMsNS4zOTk3MyAwIDAgMSAtMC43NzM5NTUsMC41MDA4NSBRIDguMjQ4NTM1LDYuNjExMzQ0IDguMDMxMTg1LDYuNzc1Nzc0IEEgMi4wNzksMi4wNzkgMCAwIDAgNy40NTQ3MzUsNy40NDc2NjkgViA1LjY3OTU3NCBIIDYuNjI0MDggTCA0LjA2MjE4NSw4LjgzMTE0OSB2IDAuNjg4OTA1IGggMi42MTc2NSB2IDAuOTg2NTgxIGggMC43ODQzNSBWIDkuNTE5MTA5IEggNy40NzQ1OCBWIDguODEzMTk0IEggNy40NjQxODUgViA4LjY3OTk0OSBoIDEuNTQ3OTEgYSAxLjk5MjA2LDEuOTkyMDYgMCAwIDAgLTAuMjk2NzMsMC40ODM4NCAyLjM3OTUxLDIuMzc5NTEgMCAwIDAgLTAuMTg5LDAuOTcyNDA2IDIuMTczNSwyLjE3MzUgMCAwIDAgMC4xODksMC45Mjc5OSAxLjczMTI0LDEuNzMxMjQgMCAwIDAgMC41MTEyNDUsMC42NjE1IDIuMzg0MjM1LDIuMzg0MjM1IDAgMCAwIDAuNzA3ODA1LDAuMzc4IDIuNTUxNSwyLjU1MTUgMCAwIDAgMC44MTA4MSwwLjEyOTQ2NSAyLjcwMDgxLDIuNzAwODEgMCAwIDAgMS4xOTI1OSwtMC4yNjQ2IHYgLTAuODYzNzMgcSAtMC4zNzk4OSwwLjMzODMxIC0xLjA2MTIzNSwwLjMzODMxIHogTSA2LjY3OTgzNSw4LjgxMzE5NCBIIDQuOTYwODggTCA2LjY3OTgzNSw2LjcwNDg5OSBaIgogICAgIGlkPSJwYXRoMjAiCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgLz4KPC9zdmc+Cg==";
function gM() {
  return /* @__PURE__ */ M.jsxs(M.Fragment, { children: [
    /* @__PURE__ */ M.jsx("h1", { children: "No security audit report available for this file" }),
    /* @__PURE__ */ M.jsxs("p", { children: [
      "Please click the ",
      /* @__PURE__ */ M.jsx("img", { src: jM, style: { width: 16, height: 16 } }),
      " button to run OpenAPI Security Audit"
    ] })
  ] });
}
function NM() {
  return /* @__PURE__ */ M.jsx(M.Fragment, { children: /* @__PURE__ */ M.jsx("h1", { children: "Loading security audit report..." }) });
}
function IM() {
  const i = r((s) => s.audit.kdb), o = r((s) => s.audit.display), c = r((s) => s.audit.selected), e = r((s) => s.theme), t = V(), L = (s, n, O) => t(A({ uri: s, line: n, pointer: O })), j = (s) => t(z(s)), I = (s) => t(m(s)), g = (e == null ? void 0 : e.kind) === "dark" ? "dark" : "light";
  return /* @__PURE__ */ M.jsxs(M.Fragment, { children: [
    /* @__PURE__ */ M.jsx("style", { type: "text/css", children: nM }),
    /* @__PURE__ */ M.jsxs("div", { className: g === "dark" ? "vscode-dark" : "", children: [
      o !== "no-report" && /* @__PURE__ */ M.jsx($, { openLink: I, themeKind: g }),
      o === "full" && /* @__PURE__ */ M.jsx(q, { openLink: I }),
      o === "no-report" && /* @__PURE__ */ M.jsx(gM, {}),
      o === "loading" && /* @__PURE__ */ M.jsx(NM, {}),
      c.map((s) => /* @__PURE__ */ M.jsx(
        tM,
        {
          kdb: i,
          issue: s,
          goToLine: L,
          copyIssueId: j,
          openLink: I
        },
        s.key
      )),
      o === "full" && c.length === 0 && /* @__PURE__ */ M.jsx("h3", { children: "No issues found in this file" }),
      o === "partial" && /* @__PURE__ */ M.jsx(LM, { goToFullReport: () => t(D()) }),
      o !== "no-report" && /* @__PURE__ */ M.jsx(MM, { openLink: I, themeKind: g })
    ] })
  ] });
}
const nM = `body {
  background-color: var(--xliic-background);
  color: var(--xliic-foreground);
  margin: 0 10px !important;
}

#root small {
 font-size: 0.8em;
}

#root {
  font-size: 0.8em;
}

#root h1 {
  font-size: 1.5em;
  font-weight: 600;
}

#root h2 {
  font-size: 1.2em;
  font-weight: 600;
}

#root h3 {
  font-size: 1em;
  font-weight: 600;
}

pre {
  white-space: pre-wrap;
}

.c_header {
  background-color: #f1f1f1;
  margin-bottom: 20px;
  margin-left: -20px;
  margin-right: -20px;
  padding: 10px 20px 10px 20px;
  top: 0px;
  border-bottom: 1px solid #bbb;
  color: black;
  font-size: 14px;
  z-index: 10;
}

.c_footer {
  background-color: #f1f1f1;

  padding: 20px 20px 20px 20px;
  margin-left: -20px;
  margin-right: -20px;
  bottom: 0px;
  border-top: 1px solid #bbb;
  color: black;
  font-size: 14px;
}
.bottom-menu ul {
  margin: 0px;
  padding: 0px;
}
.bottom-menu li {
  float: left;
  list-style: none;
  font-weight: bold;
  margin-right: 10px;
}
.bottom-menu li a {
  text-decoration: none;
}
.c_header span img,
.c_footer span img {
  width: 100px;
  margin-left: 10px;
}

.font-weight-bold {
  font-weight: bold;
}

.c_roundedbox {
  padding: 20px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  margin-bottom: 20px;
}

.c_roundedbox_section {
  padding: 10px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  margin-bottom: 10px;
}

.c_roundedbox_section > h2:first-child {
  margin-block-start: 0;
}

.c_roundedbox_section > p:last-child {
  margin-block-end: 0;
}

.c_roundedbox_section h1 {
  margin-top: 0px;
}
.c_roundedbox h1 {
  margin-top: 0px;
}
.c_roundedbox h1 span, .c_roundedbox h3 span {
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 2px 5px 2px 5px;
}

.progress-bar-holder {
  height: 10px;
  width: 100%;
  background-color: #c4c4c4;
  position: relative;
  border-radius: 10px;
  margin-top: 1em;
  margin-bottom: 1em;
}

.progress-bar {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  background-color: #000;
  border-radius: 10px;
}
.bar-red {
  background-color: #ff1d5a;
}
.bar-yellow {
  background-color: #ffb01d;
}
.bar-green {
  background-color: #7bd21e;
}
.issue-id {
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 2px 8px 3px 8px;
  background-color: #b1b0b0;
  color: #fff;
  cursor: pointer;
}

.dropbtn {
  background-color: #ffffff;
  color: #313131;
  padding: 10px 20px 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #bbb;
  border-radius: 5px;
}

.dropbtn:hover,
.dropbtn:focus {
  background-color: #9d73aa;
  color: #ffffff;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0px;
  background-color: #f1f1f1;
  min-width: 260px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 0px 0px 10px 10px;
}
.dropdown-content-f {
  display: none;
  position: absolute;
  right: 0px;
  top: -120px;
  background-color: #f1f1f1;
  min-width: 260px;
  box-shadow: -2px -5px 16px 0px rgb(0 0 0 / 20%);
  z-index: 1;
  border-radius: 10px 10px 0px 0px;
}
.dropdown-content-f a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}

.show {
  display: block;
}

.vscode-dark .c_header,
.vscode-high-contrast .c_header {
  background-color: #1e1e1e;
  color: #f3f3f3;
  border-bottom: 1px solid #bbb;
}

.vscode-dark .c_footer,
.vscode-high-contrast .c_footer {
  background-color: #1e1e1e;
  color: #f3f3f3;
}

.vscode-dark .dropbtn {
  background-color: #835194;
  color: #ffffff;
  border: 1px solid #835194;
}

.vscode-high-contrast .dropbtn {
  background-color: #1e1e1e;
  color: #ffffff;
  border: 1px solid #1e1e1e;
}

.vscode-dark .dropdown-content,
.vscode-high-contrast .dropdown-content {
  background-color: #1e1e1e;
}

.vscode-dark .dropdown-content a,
.vscode-high-contrast .dropdown-content a {
  color: white;
}

.vscode-dark .dropdown-content a:hover,
.vscode-high-contrast .dropdown-content a:hover {
  background-color: #3c3b3b;
}

.vscode-dark .issue-id {
  border: 1px solid #834e93;
  background-color: #834c8f;
  color: #fff;
}

.vscode-high-contrast .issue-id {
  background-color: #1e1e1e;
}`;
const rM = {
  showFullReport: y,
  showPartialReport: w,
  showNoReport: p,
  loadKdb: J,
  changeTheme: P
};
function uM() {
  return /* @__PURE__ */ M.jsxs(M.Fragment, { children: [
    /* @__PURE__ */ M.jsx(B, {}),
    /* @__PURE__ */ M.jsx(IM, {})
  ] });
}
function dM(i, o) {
  const c = K(_(i), o);
  v(document.getElementById("root")).render(
    /* @__PURE__ */ M.jsx(Q.StrictMode, { children: /* @__PURE__ */ M.jsx(W, { store: c, children: /* @__PURE__ */ M.jsx(uM, {}) }) })
  ), window.addEventListener("message", R(c, rM));
}
window.renderWebView = dM;
