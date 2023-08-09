import {
  createBaseVNode,
  createCommentVNode,
  createElementBlock,
  defineComponent,
  normalizeStyle,
  onMounted,
  openBlock,
  ref,
  toDisplayString,
  watch
} from "./chunk-4KCUKNDK.js";

// node_modules/.pnpm/xing-ly@0.0.4/node_modules/xing-ly/dist/xing-ly.es.js
var k = { class: "lx-canvas" };
var A = ["width", "height"];
var B = {
  key: 0,
  class: "canvas-info"
};
var F = createBaseVNode("td", null, "图片路径", -1);
var L = createBaseVNode("td", null, "缩放比例", -1);
var U = createBaseVNode("td", null, "最小限制缩放", -1);
var E = defineComponent({
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
  setup(i) {
    const m = i, a = ref(), u = ref(), g = ref(), e = ref({
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
    }), s = ref({
      display: "none",
      top: "0px",
      left: "0px"
    });
    function d() {
      var l;
      e.value.imgScale = 1, e.value.imgPos.x = 0, e.value.imgPos.y = 0, g.value = (l = a.value) == null ? void 0 : l.getContext("2d"), w();
    }
    function w() {
      if (!a.value)
        throw "canvas is null or undefined";
      u.value = new Image(), u.value.src = m.imageUrl, u.value.onload = function() {
        if (!a.value)
          throw "canvas is null or undefined";
        e.value.imgXAutoScale = a.value.width / u.value.width, e.value.imgYAutoScale = a.value.height / u.value.height, r();
      };
    }
    function r() {
      if (!a.value)
        throw "canvas not defined";
      g.value.clearRect(0, 0, a.value.width, a.value.height), g.value.drawImage(
        u.value,
        // 规定要使用的图像、画布或视频。
        0,
        0,
        // 开始剪切的 x 坐标位置。
        u.value.width,
        u.value.height,
        // 被剪切图像的高度。
        e.value.imgPos.x,
        e.value.imgPos.y,
        // 在画布上放置图像的x、y坐标位置。
        u.value.width * e.value.imgScale * e.value.imgXAutoScale,
        u.value.height * e.value.imgScale * e.value.imgYAutoScale
        // 要使用的图像的宽度、高度
      );
    }
    function S(l) {
      if (l.preventDefault(), e.value.dragging) {
        const n = h(l.clientX, l.clientY);
        e.value.imgPos.x += n.x - e.value.lastMousePos.x, e.value.imgPos.y += n.y - e.value.lastMousePos.y, e.value.lastMousePos = JSON.parse(JSON.stringify(n)), r();
      }
    }
    function p(l) {
      l.preventDefault(), s.value.display = "none", e.value.dragging = true, e.value.lastMousePos = h(l.clientX, l.clientY);
    }
    function P() {
      e.value.dragging = false;
    }
    function _() {
      e.value.dragging = false;
    }
    function M(l) {
      l.preventDefault();
      var n = h(l.clientX, l.clientY);
      const c = l.wheelDelta ? l.wheelDelta : l.deltaY * -40;
      var o = {
        x: Number(((n.x - e.value.imgPos.x) / e.value.imgScale).toFixed(2)),
        y: Number(((n.y - e.value.imgPos.y) / e.value.imgScale).toFixed(2))
      };
      c > 0 ? e.value.imgScale += 0.1 : (e.value.imgScale -= 0.1, e.value.imgScale < m.minLimitScale && (e.value.imgScale = m.minLimitScale)), e.value.imgPos.x = (1 - e.value.imgScale) * o.x + (n.x - o.x), e.value.imgPos.y = (1 - e.value.imgScale) * o.y + (n.y - o.y), r();
    }
    function h(l, n) {
      var o;
      if (!a.value)
        throw "canvas is null or undefined";
      var c = (o = a.value) == null ? void 0 : o.getBoundingClientRect();
      return {
        x: l - c.left - (c.width - a.value.width) / 2,
        y: n - c.top - (c.height - a.value.height) / 2
      };
    }
    function N(l) {
      l.preventDefault(), s.value.display = "block", s.value.top = `${l.clientY}px`, s.value.left = `${l.clientX}px`;
    }
    function b() {
      d(), s.value.display = "none";
    }
    return watch(m, () => {
      d();
    }), onMounted(() => {
      d();
    }), (l, n) => (openBlock(), createElementBlock("div", k, [
      createBaseVNode("canvas", {
        ref_key: "canvas",
        ref: a,
        width: i.width,
        height: i.height,
        onMousedown: p,
        onMousemove: S,
        onMouseout: _,
        onMouseup: P,
        onWheel: M,
        onContextmenu: N
      }, null, 40, A),
      i.showInfo ? (openBlock(), createElementBlock("div", B, [
        createBaseVNode("table", null, [
          createBaseVNode("tr", null, [
            F,
            createBaseVNode("td", null, toDisplayString(i.imageUrl), 1)
          ]),
          createBaseVNode("tr", null, [
            L,
            createBaseVNode("td", null, toDisplayString(Number(e.value.imgScale).toFixed(2)), 1)
          ]),
          createBaseVNode("tr", null, [
            U,
            createBaseVNode("td", null, toDisplayString(Number(i.minLimitScale).toFixed(2)), 1)
          ])
        ])
      ])) : createCommentVNode("", true),
      createBaseVNode("div", {
        class: "context-menu",
        style: normalizeStyle(s.value)
      }, [
        createBaseVNode("div", { onClick: b }, "还原缩放")
      ], 4)
    ]));
  }
});
var O = {
  install: function(i) {
    i.component("xl-canvas-image", E);
  }
};
export {
  E as XlCanvasImage,
  O as default
};
//# sourceMappingURL=xing-ly.js.map
