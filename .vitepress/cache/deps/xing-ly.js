import {
  Fragment,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  defineComponent,
  normalizeClass,
  normalizeStyle,
  onMounted,
  openBlock,
  ref,
  renderList,
  toDisplayString,
  watch,
  withModifiers
} from "./chunk-OKFY4OVN.js";

// node_modules/.pnpm/xing-ly@0.0.11_postcss@8.4.30_vite@4.4.9/node_modules/xing-ly/dist/xing-ly.es.js
var G = { class: "lx-canvas" };
var J = ["width", "height"];
var O = {
  key: 0,
  class: "canvas-info"
};
var V = createBaseVNode("td", null, "图片路径", -1);
var T = createBaseVNode("td", null, "缩放比例", -1);
var W = createBaseVNode("td", null, "最小限制缩放", -1);
var Z = defineComponent({
  __name: "index",
  props: {
    imageUrl: {
      // 图片路径
      type: String,
      default: ""
    },
    height: {
      // 定义图片展示的高度
      type: Number,
      default: 480
    },
    width: {
      // 定义图片展示的宽度
      type: Number,
      default: 854
    },
    showInfo: {
      type: Boolean,
      default: false
    },
    minLimitScale: {
      type: Number,
      default: 0.1
    }
  },
  setup(m) {
    const v = m, i = ref(), a = ref(), h = ref(), t = ref({
      imgPos: { x: 0, y: 0 },
      // 图片定位
      lastMousePos: { x: 0, y: 0 },
      // 记录上次鼠标位置
      dragging: false,
      // 是否正在拖拽
      imgScale: 1,
      // 缩放比例
      imgXAutoScale: 0,
      // 图片适应拉伸宽度
      imgYAutoScale: 0
      // 图片适应拉伸高度
    }), o = ref({
      display: "none",
      top: "0px",
      left: "0px"
    });
    function S() {
      var l;
      t.value.imgScale = 1, t.value.imgPos.x = 0, t.value.imgPos.y = 0, h.value = (l = i.value) == null ? void 0 : l.getContext("2d"), p();
    }
    function p() {
      if (!i.value)
        throw "canvas is null or undefined";
      a.value = new Image(), a.value.src = v.imageUrl, a.value.onload = function() {
        if (!i.value)
          throw "canvas is null or undefined";
        t.value.imgXAutoScale = i.value.width / a.value.width, t.value.imgYAutoScale = i.value.height / a.value.height, M();
      };
    }
    function M() {
      if (!i.value)
        throw "canvas not defined";
      h.value.clearRect(0, 0, i.value.width, i.value.height), h.value.drawImage(
        a.value,
        // 规定要使用的图像、画布或视频。
        0,
        0,
        // 开始剪切的 x 坐标位置。
        a.value.width,
        a.value.height,
        // 被剪切图像的高度。
        t.value.imgPos.x,
        t.value.imgPos.y,
        // 在画布上放置图像的x、y坐标位置。
        a.value.width * t.value.imgScale * t.value.imgXAutoScale,
        a.value.height * t.value.imgScale * t.value.imgYAutoScale
        // 要使用的图像的宽度、高度
      );
    }
    function b(l) {
      if (l.preventDefault(), t.value.dragging) {
        const r = _(l.clientX, l.clientY);
        t.value.imgPos.x += r.x - t.value.lastMousePos.x, t.value.imgPos.y += r.y - t.value.lastMousePos.y, t.value.lastMousePos = JSON.parse(JSON.stringify(r)), M();
      }
    }
    function k(l) {
      l.preventDefault(), o.value.display = "none", t.value.dragging = true, t.value.lastMousePos = _(l.clientX, l.clientY);
    }
    function w() {
      t.value.dragging = false;
    }
    function $() {
      t.value.dragging = false;
    }
    function A(l) {
      l.preventDefault();
      var r = _(l.clientX, l.clientY);
      const x = l.wheelDelta ? l.wheelDelta : l.deltaY * -40;
      var e = {
        x: Number(((r.x - t.value.imgPos.x) / t.value.imgScale).toFixed(2)),
        y: Number(((r.y - t.value.imgPos.y) / t.value.imgScale).toFixed(2))
      };
      x > 0 ? t.value.imgScale += 0.1 : (t.value.imgScale -= 0.1, t.value.imgScale < v.minLimitScale && (t.value.imgScale = v.minLimitScale)), t.value.imgPos.x = (1 - t.value.imgScale) * e.x + (r.x - e.x), t.value.imgPos.y = (1 - t.value.imgScale) * e.y + (r.y - e.y), M();
    }
    function _(l, r) {
      var e;
      if (!i.value)
        throw "canvas is null or undefined";
      var x = (e = i.value) == null ? void 0 : e.getBoundingClientRect();
      return {
        x: l - x.left - (x.width - i.value.width) / 2,
        y: r - x.top - (x.height - i.value.height) / 2
      };
    }
    function N(l) {
      l.preventDefault(), o.value.display = "block", o.value.top = `${l.clientY}px`, o.value.left = `${l.clientX}px`;
    }
    function C() {
      S(), o.value.display = "none";
    }
    return watch(v, () => {
      S();
    }), onMounted(() => {
      S();
    }), (l, r) => (openBlock(), createElementBlock("div", G, [
      createBaseVNode("canvas", {
        ref_key: "canvas",
        ref: i,
        width: m.width,
        height: m.height,
        onMousedown: k,
        onMousemove: b,
        onMouseout: $,
        onMouseup: w,
        onWheel: A,
        onContextmenu: N
      }, null, 40, J),
      m.showInfo ? (openBlock(), createElementBlock("div", O, [
        createBaseVNode("table", null, [
          createBaseVNode("tr", null, [
            V,
            createBaseVNode("td", null, toDisplayString(m.imageUrl), 1)
          ]),
          createBaseVNode("tr", null, [
            T,
            createBaseVNode("td", null, toDisplayString(Number(t.value.imgScale).toFixed(2)), 1)
          ]),
          createBaseVNode("tr", null, [
            W,
            createBaseVNode("td", null, toDisplayString(Number(m.minLimitScale).toFixed(2)), 1)
          ])
        ])
      ])) : createCommentVNode("", true),
      createBaseVNode("div", {
        class: "context-menu",
        style: normalizeStyle(o.value)
      }, [
        createBaseVNode("div", { onClick: C }, "还原缩放")
      ], 4)
    ]));
  }
});
var q = {
  key: 0,
  "i-mdi-flag": "",
  "text-red": ""
};
var H = {
  key: 0,
  "i-mdi-mine": ""
};
var K = { key: 1 };
var Q = defineComponent({
  __name: "MineBlock",
  props: {
    block: {}
  },
  setup(m) {
    const v = [
      "text-transparent",
      "text-blue-500",
      "text-green-500",
      "text-yellow-500",
      "text-orange-500",
      "text-red-500",
      "text-purple-500",
      "text-pink-500"
    ];
    function i(a) {
      return a.flagged ? "bg-gray-500/10" : a.revealed ? a.mine ? "text-red" : v[a.adjacentMines] : "bg-gray-500/10 hover:bg-gray-500/20";
    }
    return (a, h) => (openBlock(), createElementBlock("button", {
      class: normalizeClass(i(a.block)),
      border: "1 gray-500/10"
    }, [
      a.block.flagged ? (openBlock(), createElementBlock("div", q)) : a.block.revealed ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        a.block.mine ? (openBlock(), createElementBlock("div", H)) : (openBlock(), createElementBlock("div", K, toDisplayString(a.block.adjacentMines), 1))
      ], 64)) : createCommentVNode("", true)
    ], 2));
  }
});
var ee = { class: "game-mines-map" };
var te = defineComponent({
  __name: "index",
  setup(m) {
    let v = false;
    const i = ref(15), a = ref(0), h = ref("play"), t = ref("general"), o = {
      simple: {
        mineNum: 10,
        width: 5,
        height: 5
      },
      general: {
        mineNum: 40,
        width: 15,
        height: 15
      },
      difficult: {
        mineNum: 60,
        width: 15,
        height: 15
      },
      hell: {
        mineNum: 80,
        width: 15,
        height: 15
      }
    }, S = [
      [-1, 0],
      [-1, -1],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ], p = ref([]);
    function M() {
      h.value = "play", v = false, a.value = 0, i.value = o[t.value].mineNum, p.value = Array.from(
        { length: o[t.value].height },
        (e, n) => Array.from(
          { length: o[t.value].width },
          (u, s) => ({
            x: s,
            y: n,
            adjacentMines: 0
          })
        )
      );
    }
    function b(e) {
      e.revealed || ((a.value === i.value && e.flagged || a.value < i.value) && (e.flagged = !e.flagged, a.value += e.flagged ? 1 : -1), C());
    }
    function k(e, n, u) {
      a.value = 0, w(e, n, u), $(e);
    }
    function w(e, n, u) {
      if (u === 0)
        return;
      const s = x(0, o[t.value].width), g = x(0, o[t.value].height);
      Math.abs(n.x - s) <= 1 && Math.abs(n.y - g) <= 1 || e[g][s].mine ? w(e, n, u) : (e[g][s].mine = true, w(e, n, u - 1));
    }
    function $(e) {
      e.forEach((n) => {
        n.forEach((u) => {
          u.mine || N(u).forEach((s) => {
            s.mine && (u.adjacentMines += 1);
          });
        });
      });
    }
    function A(e) {
      h.value !== "play" || e.flagged || (e.revealed = true, v || (k(p.value, e, i.value), v = true), e.mine && (h.value = "lost", l()), _(e), C());
    }
    function _(e) {
      e.adjacentMines || N(e).forEach((n) => {
        n.revealed || (n.revealed = true, _(n));
      });
    }
    function N(e) {
      return S.map(([n, u]) => {
        const s = e.x + n, g = e.y + u;
        if (!(s < 0 || g < 0 || s >= o[t.value].width || g >= o[t.value].height))
          return p.value[g][s];
      }).filter(Boolean);
    }
    function C() {
      if (!v || h.value !== "play")
        return;
      const e = p.value.flat();
      (!e.some((n) => !n.mine && !n.revealed) || e.filter((n) => n.mine).every((n) => n.flagged)) && (h.value = "won");
    }
    function l() {
      p.value.flat().forEach((e) => {
        e.mine && (e.revealed = true);
      });
    }
    function r(e, n) {
      return Math.random() * (n - e) + e;
    }
    function x(e, n) {
      return Math.floor(r(e, n));
    }
    return M(), (e, n) => (openBlock(), createElementBlock("div", ee, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(p.value, (u, s) => (openBlock(), createElementBlock("div", {
        key: s,
        flex: "",
        "justify-center": ""
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(u, (g, Y) => (openBlock(), createBlock(Q, {
          key: Y,
          "h-10": "",
          "w-10": "",
          flex: "",
          "items-center": "",
          "justify-center": "",
          block: g,
          onClick: (j) => A(g),
          onContextmenu: withModifiers((j) => b(g), ["prevent"])
        }, null, 8, ["block", "onClick", "onContextmenu"]))), 128))
      ]))), 128))
    ]));
  }
});
var ae = {
  install: function(m) {
    m.component("xl-canvas-image", Z), m.component("xl-game-mine", te);
  }
};
export {
  Z as XlCanvasImage,
  te as XlGameMine,
  ae as default
};
//# sourceMappingURL=xing-ly.js.map
