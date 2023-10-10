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

// node_modules/.pnpm/xing-ly@0.0.13_@iconify-json+mdi@1.1.54_@unocss+reset@0.55.7_unocss@0.55.7_vite@4.4.9/node_modules/xing-ly/dist/xing-ly.es.js
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
    const v = m, i = ref(), n = ref(), h = ref(), t = ref({
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
      n.value = new Image(), n.value.src = v.imageUrl, n.value.onload = function() {
        if (!i.value)
          throw "canvas is null or undefined";
        t.value.imgXAutoScale = i.value.width / n.value.width, t.value.imgYAutoScale = i.value.height / n.value.height, M();
      };
    }
    function M() {
      if (!i.value)
        throw "canvas not defined";
      h.value.clearRect(0, 0, i.value.width, i.value.height), h.value.drawImage(
        n.value,
        // 规定要使用的图像、画布或视频。
        0,
        0,
        // 开始剪切的 x 坐标位置。
        n.value.width,
        n.value.height,
        // 被剪切图像的高度。
        t.value.imgPos.x,
        t.value.imgPos.y,
        // 在画布上放置图像的x、y坐标位置。
        n.value.width * t.value.imgScale * t.value.imgXAutoScale,
        n.value.height * t.value.imgScale * t.value.imgYAutoScale
        // 要使用的图像的宽度、高度
      );
    }
    function b(l) {
      if (l.preventDefault(), t.value.dragging) {
        const s = _(l.clientX, l.clientY);
        t.value.imgPos.x += s.x - t.value.lastMousePos.x, t.value.imgPos.y += s.y - t.value.lastMousePos.y, t.value.lastMousePos = JSON.parse(JSON.stringify(s)), M();
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
      var s = _(l.clientX, l.clientY);
      const x = l.wheelDelta ? l.wheelDelta : l.deltaY * -40;
      var e = {
        x: Number(((s.x - t.value.imgPos.x) / t.value.imgScale).toFixed(2)),
        y: Number(((s.y - t.value.imgPos.y) / t.value.imgScale).toFixed(2))
      };
      x > 0 ? t.value.imgScale += 0.1 : (t.value.imgScale -= 0.1, t.value.imgScale < v.minLimitScale && (t.value.imgScale = v.minLimitScale)), t.value.imgPos.x = (1 - t.value.imgScale) * e.x + (s.x - e.x), t.value.imgPos.y = (1 - t.value.imgScale) * e.y + (s.y - e.y), M();
    }
    function _(l, s) {
      var e;
      if (!i.value)
        throw "canvas is null or undefined";
      var x = (e = i.value) == null ? void 0 : e.getBoundingClientRect();
      return {
        x: l - x.left - (x.width - i.value.width) / 2,
        y: s - x.top - (x.height - i.value.height) / 2
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
    }), (l, s) => (openBlock(), createElementBlock("div", G, [
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
  class: "text-red i-mdi-flag"
};
var H = {
  key: 0,
  class: "i-mdi-mine"
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
    function i(n) {
      return n.flagged ? "bg-gray-500/10" : n.revealed ? n.mine ? "text-red" : v[n.adjacentMines] : "bg-gray-500/10 hover:bg-gray-500/20";
    }
    return (n, h) => (openBlock(), createElementBlock("button", {
      class: normalizeClass([i(n.block), "border-1 border-gray-500/10"])
    }, [
      n.block.flagged ? (openBlock(), createElementBlock("div", q)) : n.block.revealed ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        n.block.mine ? (openBlock(), createElementBlock("div", H)) : (openBlock(), createElementBlock("div", K, toDisplayString(n.block.adjacentMines), 1))
      ], 64)) : createCommentVNode("", true)
    ], 2));
  }
});
var ee = { class: "game-mines-map" };
var te = defineComponent({
  __name: "index",
  setup(m) {
    let v = false;
    const i = ref(15), n = ref(0), h = ref("play"), t = ref("general"), o = {
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
      h.value = "play", v = false, n.value = 0, i.value = o[t.value].mineNum, p.value = Array.from(
        { length: o[t.value].height },
        (e, a) => Array.from(
          { length: o[t.value].width },
          (u, r) => ({
            x: r,
            y: a,
            adjacentMines: 0
          })
        )
      );
    }
    function b(e) {
      e.revealed || ((n.value === i.value && e.flagged || n.value < i.value) && (e.flagged = !e.flagged, n.value += e.flagged ? 1 : -1), C());
    }
    function k(e, a, u) {
      n.value = 0, w(e, a, u), $(e);
    }
    function w(e, a, u) {
      if (u === 0)
        return;
      const r = x(0, o[t.value].width), g = x(0, o[t.value].height);
      Math.abs(a.x - r) <= 1 && Math.abs(a.y - g) <= 1 || e[g][r].mine ? w(e, a, u) : (e[g][r].mine = true, w(e, a, u - 1));
    }
    function $(e) {
      e.forEach((a) => {
        a.forEach((u) => {
          u.mine || N(u).forEach((r) => {
            r.mine && (u.adjacentMines += 1);
          });
        });
      });
    }
    function A(e) {
      h.value !== "play" || e.flagged || (e.revealed = true, v || (k(p.value, e, i.value), v = true), e.mine && (h.value = "lost", l()), _(e), C());
    }
    function _(e) {
      e.adjacentMines || N(e).forEach((a) => {
        a.revealed || (a.revealed = true, _(a));
      });
    }
    function N(e) {
      return S.map(([a, u]) => {
        const r = e.x + a, g = e.y + u;
        if (!(r < 0 || g < 0 || r >= o[t.value].width || g >= o[t.value].height))
          return p.value[g][r];
      }).filter(Boolean);
    }
    function C() {
      if (!v || h.value !== "play")
        return;
      const e = p.value.flat();
      (!e.some((a) => !a.mine && !a.revealed) || e.filter((a) => a.mine).every((a) => a.flagged)) && (h.value = "won");
    }
    function l() {
      p.value.flat().forEach((e) => {
        e.mine && (e.revealed = true);
      });
    }
    function s(e, a) {
      return Math.random() * (a - e) + e;
    }
    function x(e, a) {
      return Math.floor(s(e, a));
    }
    return M(), (e, a) => (openBlock(), createElementBlock("div", ee, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(p.value, (u, r) => (openBlock(), createElementBlock("div", {
        key: r,
        class: "flex justify-center"
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(u, (g, Y) => (openBlock(), createBlock(Q, {
          key: Y,
          class: "h-10 w-10 flex items-center justify-center",
          block: g,
          onClick: (j) => A(g),
          onContextmenu: withModifiers((j) => b(g), ["prevent"])
        }, null, 8, ["block", "onClick", "onContextmenu"]))), 128))
      ]))), 128))
    ]));
  }
});
var ne = {
  install: function(m) {
    m.component("xl-canvas-image", Z), m.component("xl-game-mines", te);
  }
};
export {
  Z as XlCanvasImage,
  te as XlGameMines,
  ne as default
};
//# sourceMappingURL=xing-ly.js.map
