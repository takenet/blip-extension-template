(function () {
  'use strict';
  let o;
  const L =
    typeof TextDecoder < 'u'
      ? new TextDecoder('utf-8', { ignoreBOM: !0, fatal: !0 })
      : {
          decode: () => {
            throw Error('TextDecoder not available');
          },
        };
  typeof TextDecoder < 'u' && L.decode();
  let k = null;
  function A() {
    return (
      (k === null || k.byteLength === 0) &&
        (k = new Uint8Array(o.memory.buffer)),
      k
    );
  }
  function v(n, e) {
    return (n = n >>> 0), L.decode(A().subarray(n, n + e));
  }
  const p = new Array(128).fill(void 0);
  p.push(void 0, null, !0, !1);
  let x = p.length;
  function u(n) {
    x === p.length && p.push(p.length + 1);
    const e = x;
    return (x = p[e]), (p[e] = n), e;
  }
  function i(n) {
    return p[n];
  }
  function D(n) {
    n < 132 || ((p[n] = x), (x = n));
  }
  function f(n) {
    const e = i(n);
    return D(n), e;
  }
  let w = 0;
  const M =
      typeof TextEncoder < 'u'
        ? new TextEncoder('utf-8')
        : {
            encode: () => {
              throw Error('TextEncoder not available');
            },
          },
    N =
      typeof M.encodeInto == 'function'
        ? function (n, e) {
            return M.encodeInto(n, e);
          }
        : function (n, e) {
            const t = M.encode(n);
            return e.set(t), { read: n.length, written: t.length };
          };
  function l(n, e, t) {
    if (t === void 0) {
      const b = M.encode(n),
        d = e(b.length, 1) >>> 0;
      return (
        A()
          .subarray(d, d + b.length)
          .set(b),
        (w = b.length),
        d
      );
    }
    let r = n.length,
      _ = e(r, 1) >>> 0;
    const s = A();
    let c = 0;
    for (; c < r; c++) {
      const b = n.charCodeAt(c);
      if (b > 127) break;
      s[_ + c] = b;
    }
    if (c !== r) {
      c !== 0 && (n = n.slice(c)),
        (_ = t(_, r, (r = c + n.length * 3), 1) >>> 0);
      const b = A().subarray(_ + c, _ + r),
        d = N(n, b);
      c += d.written;
    }
    return (w = c), _;
  }
  function m(n) {
    return n == null;
  }
  let T = null;
  function a() {
    return (
      (T === null || T.byteLength === 0) &&
        (T = new Int32Array(o.memory.buffer)),
      T
    );
  }
  let j = null;
  function P() {
    return (
      (j === null || j.byteLength === 0) &&
        (j = new Float64Array(o.memory.buffer)),
      j
    );
  }
  let U = null;
  function q() {
    return (
      (U === null || U.byteLength === 0) &&
        (U = new BigInt64Array(o.memory.buffer)),
      U
    );
  }
  function B(n) {
    const e = typeof n;
    if (e == 'number' || e == 'boolean' || n == null) return `${n}`;
    if (e == 'string') return `"${n}"`;
    if (e == 'symbol') {
      const _ = n.description;
      return _ == null ? 'Symbol' : `Symbol(${_})`;
    }
    if (e == 'function') {
      const _ = n.name;
      return typeof _ == 'string' && _.length > 0
        ? `Function(${_})`
        : 'Function';
    }
    if (Array.isArray(n)) {
      const _ = n.length;
      let s = '[';
      _ > 0 && (s += B(n[0]));
      for (let c = 1; c < _; c++) s += ', ' + B(n[c]);
      return (s += ']'), s;
    }
    const t = /\[object ([^\]]+)\]/.exec(toString.call(n));
    let r;
    if (t.length > 1) r = t[1];
    else return toString.call(n);
    if (r == 'Object')
      try {
        return 'Object(' + JSON.stringify(n) + ')';
      } catch {
        return 'Object';
      }
    return n instanceof Error
      ? `${n.name}: ${n.message}
${n.stack}`
      : r;
  }
  function C(n, e) {
    if (!(n instanceof e)) throw new Error(`expected instance of ${e.name}`);
    return n.ptr;
  }
  function z(n, e) {
    return (n = n >>> 0), A().subarray(n / 1, n / 1 + e);
  }
  let I = null;
  function H() {
    return (
      (I === null || I.byteLength === 0) &&
        (I = new Uint32Array(o.memory.buffer)),
      I
    );
  }
  function W(n, e) {
    const t = e(n.length * 4, 4) >>> 0;
    return H().set(n, t / 4), (w = n.length), t;
  }
  function h(n, e) {
    try {
      return n.apply(this, e);
    } catch (t) {
      o.__wbindgen_exn_store(u(t));
    }
  }
  class O {
    static __wrap(e) {
      e = e >>> 0;
      const t = Object.create(O.prototype);
      return (t.__wbg_ptr = e), t;
    }
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return (this.__wbg_ptr = 0), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      o.__wbg_core_free(e);
    }
    constructor(e, t) {
      try {
        const b = o.__wbindgen_add_to_stack_pointer(-16);
        C(e, S);
        var r = e.__destroy_into_raw();
        o.core_new(b, r, u(t));
        var _ = a()[b / 4 + 0],
          s = a()[b / 4 + 1],
          c = a()[b / 4 + 2];
        if (c) throw f(s);
        return O.__wrap(_);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    update(e) {
      const t = o.core_update(this.__wbg_ptr, u(e));
      return f(t);
    }
    set_source(e) {
      const t = o.core_set_source(this.__wbg_ptr, u(e));
      return f(t);
    }
    set_buffer(e) {
      const t = o.core_set_buffer(this.__wbg_ptr, u(e));
      return f(t);
    }
    delete(e) {
      o.core_delete(this.__wbg_ptr, u(e));
    }
    autocomplete(e, t, r) {
      const _ = l(e, o.__wbindgen_malloc, o.__wbindgen_realloc),
        s = w,
        c = o.core_autocomplete(this.__wbg_ptr, _, s, t, r);
      return f(c);
    }
    tooltip(e, t) {
      try {
        const s = o.__wbindgen_add_to_stack_pointer(-16),
          c = l(e, o.__wbindgen_malloc, o.__wbindgen_realloc),
          b = w;
        o.core_tooltip(s, this.__wbg_ptr, c, b, t);
        var r = a()[s / 4 + 0],
          _ = a()[s / 4 + 1];
        let d;
        return (
          r !== 0 && ((d = v(r, _).slice()), o.__wbindgen_free(r, _ * 1)), d
        );
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    export(e) {
      try {
        const _ = o.__wbindgen_add_to_stack_pointer(-16),
          s = l(e, o.__wbindgen_malloc, o.__wbindgen_realloc),
          c = w;
        o.core_export(_, this.__wbg_ptr, s, c);
        var t = a()[_ / 4 + 0],
          r = a()[_ / 4 + 1];
        let b;
        return (
          t !== 0 && ((b = z(t, r).slice()), o.__wbindgen_free(t, r * 1)), b
        );
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    measure() {
      const e = o.core_measure(this.__wbg_ptr);
      return f(e);
    }
    render(e, t) {
      const r = o.core_render(this.__wbg_ptr, e, t);
      return f(r);
    }
    jump_to_source(e, t, r) {
      const _ = o.core_jump_to_source(this.__wbg_ptr, e, t, r);
      return f(_);
    }
    references() {
      const e = o.core_references(this.__wbg_ptr);
      return f(e);
    }
    families() {
      const e = o.core_families(this.__wbg_ptr);
      return f(e);
    }
    font_previews() {
      const e = o.core_font_previews(this.__wbg_ptr);
      return f(e);
    }
    tags() {
      const e = o.core_tags(this.__wbg_ptr);
      return f(e);
    }
    highlight(e, t) {
      const r = l(e, o.__wbindgen_malloc, o.__wbindgen_realloc),
        _ = w,
        s = W(t, o.__wbindgen_malloc),
        c = w,
        b = o.core_highlight(this.__wbg_ptr, r, _, s, c);
      return f(b);
    }
    string_highlight(e, t) {
      const r = l(e, o.__wbindgen_malloc, o.__wbindgen_realloc),
        _ = w,
        s = W(t, o.__wbindgen_malloc),
        c = w,
        b = o.core_string_highlight(this.__wbg_ptr, r, _, s, c);
      return f(b);
    }
    bibtex_highlight(e) {
      const t = l(e, o.__wbindgen_malloc, o.__wbindgen_realloc),
        r = w,
        _ = o.core_bibtex_highlight(this.__wbg_ptr, t, r);
      return f(_);
    }
    typeset(e, t, r) {
      const _ = l(e, o.__wbindgen_malloc, o.__wbindgen_realloc),
        s = w;
      var c = m(t) ? 0 : l(t, o.__wbindgen_malloc, o.__wbindgen_realloc),
        b = w;
      const d = o.core_typeset(this.__wbg_ptr, _, s, c, b, !m(r), m(r) ? 0 : r);
      return f(d);
    }
    transient_typeset(e, t) {
      const r = l(e, o.__wbindgen_malloc, o.__wbindgen_realloc),
        _ = w,
        s = o.core_transient_typeset(this.__wbg_ptr, r, _, u(t));
      return f(s);
    }
    zip() {
      try {
        const _ = o.__wbindgen_add_to_stack_pointer(-16);
        o.core_zip(_, this.__wbg_ptr);
        var e = a()[_ / 4 + 0],
          t = a()[_ / 4 + 1],
          r = z(e, t).slice();
        return o.__wbindgen_free(e, t * 1), r;
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  class S {
    static __wrap(e) {
      e = e >>> 0;
      const t = Object.create(S.prototype);
      return (t.__wbg_ptr = e), t;
    }
    __destroy_into_raw() {
      const e = this.__wbg_ptr;
      return (this.__wbg_ptr = 0), e;
    }
    free() {
      const e = this.__destroy_into_raw();
      o.__wbg_corebuilder_free(e);
    }
    constructor() {
      try {
        const _ = o.__wbindgen_add_to_stack_pointer(-16);
        o.corebuilder_new(_);
        var e = a()[_ / 4 + 0],
          t = a()[_ / 4 + 1],
          r = a()[_ / 4 + 2];
        if (r) throw f(t);
        return S.__wrap(e);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
    tags() {
      const e = o.core_tags(this.__wbg_ptr);
      return f(e);
    }
    families() {
      const e = o.corebuilder_families(this.__wbg_ptr);
      return f(e);
    }
    font_previews() {
      const e = o.corebuilder_font_previews(this.__wbg_ptr);
      return f(e);
    }
    build(e) {
      try {
        const s = this.__destroy_into_raw(),
          c = o.__wbindgen_add_to_stack_pointer(-16);
        o.core_new(c, s, u(e));
        var t = a()[c / 4 + 0],
          r = a()[c / 4 + 1],
          _ = a()[c / 4 + 2];
        if (_) throw f(r);
        return O.__wrap(t);
      } finally {
        o.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }
  async function J(n, e) {
    if (typeof Response == 'function' && n instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming == 'function')
        try {
          return await WebAssembly.instantiateStreaming(n, e);
        } catch (r) {
          if (n.headers.get('Content-Type') != 'application/wasm')
            console.warn(
              '`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n',
              r,
            );
          else throw r;
        }
      const t = await n.arrayBuffer();
      return await WebAssembly.instantiate(t, e);
    } else {
      const t = await WebAssembly.instantiate(n, e);
      return t instanceof WebAssembly.Instance ? { instance: t, module: n } : t;
    }
  }
  function V() {
    const n = {};
    return (
      (n.wbg = {}),
      (n.wbg.__wbindgen_string_new = function (e, t) {
        const r = v(e, t);
        return u(r);
      }),
      (n.wbg.__wbindgen_number_new = function (e) {
        return u(e);
      }),
      (n.wbg.__wbindgen_object_drop_ref = function (e) {
        f(e);
      }),
      (n.wbg.__wbindgen_string_get = function (e, t) {
        const r = i(t),
          _ = typeof r == 'string' ? r : void 0;
        var s = m(_) ? 0 : l(_, o.__wbindgen_malloc, o.__wbindgen_realloc),
          c = w;
        (a()[e / 4 + 1] = c), (a()[e / 4 + 0] = s);
      }),
      (n.wbg.__wbindgen_is_bigint = function (e) {
        return typeof i(e) == 'bigint';
      }),
      (n.wbg.__wbindgen_bigint_from_u64 = function (e) {
        const t = BigInt.asUintN(64, e);
        return u(t);
      }),
      (n.wbg.__wbindgen_jsval_eq = function (e, t) {
        return i(e) === i(t);
      }),
      (n.wbg.__wbindgen_is_string = function (e) {
        return typeof i(e) == 'string';
      }),
      (n.wbg.__wbindgen_is_object = function (e) {
        const t = i(e);
        return typeof t == 'object' && t !== null;
      }),
      (n.wbg.__wbindgen_is_undefined = function (e) {
        return i(e) === void 0;
      }),
      (n.wbg.__wbindgen_in = function (e, t) {
        return i(e) in i(t);
      }),
      (n.wbg.__wbindgen_error_new = function (e, t) {
        const r = new Error(v(e, t));
        return u(r);
      }),
      (n.wbg.__wbindgen_object_clone_ref = function (e) {
        const t = i(e);
        return u(t);
      }),
      (n.wbg.__wbindgen_jsval_loose_eq = function (e, t) {
        return i(e) == i(t);
      }),
      (n.wbg.__wbindgen_boolean_get = function (e) {
        const t = i(e);
        return typeof t == 'boolean' ? (t ? 1 : 0) : 2;
      }),
      (n.wbg.__wbindgen_number_get = function (e, t) {
        const r = i(t),
          _ = typeof r == 'number' ? r : void 0;
        (P()[e / 8 + 1] = m(_) ? 0 : _), (a()[e / 4 + 0] = !m(_));
      }),
      (n.wbg.__wbg_getwithrefkey_5e6d9547403deab8 = function (e, t) {
        const r = i(e)[i(t)];
        return u(r);
      }),
      (n.wbg.__wbg_set_841ac57cff3d672b = function (e, t, r) {
        i(e)[f(t)] = f(r);
      }),
      (n.wbg.__wbg_new_abda76e883ba8a5f = function () {
        const e = new Error();
        return u(e);
      }),
      (n.wbg.__wbg_stack_658279fe44541cf6 = function (e, t) {
        const r = i(t).stack,
          _ = l(r, o.__wbindgen_malloc, o.__wbindgen_realloc),
          s = w;
        (a()[e / 4 + 1] = s), (a()[e / 4 + 0] = _);
      }),
      (n.wbg.__wbg_error_f851667af71bcfc6 = function (e, t) {
        let r, _;
        try {
          (r = e), (_ = t), console.error(v(e, t));
        } finally {
          o.__wbindgen_free(r, _, 1);
        }
      }),
      (n.wbg.__wbg_log_4c205e6fbb25f8c3 = function (e, t, r) {
        console.log(i(e), i(t), i(r));
      }),
      (n.wbg.__wbg_status_114ef6fe27fb8b00 = function () {
        return h(function (e) {
          return i(e).status;
        }, arguments);
      }),
      (n.wbg.__wbg_setresponseType_cc3a30103e8256cf = function (e, t) {
        i(e).responseType = f(t);
      }),
      (n.wbg.__wbg_response_f2acf2ecbe021710 = function () {
        return h(function (e) {
          const t = i(e).response;
          return u(t);
        }, arguments);
      }),
      (n.wbg.__wbg_new_daafff584c71593b = function () {
        return h(function () {
          const e = new XMLHttpRequest();
          return u(e);
        }, arguments);
      }),
      (n.wbg.__wbg_open_56fa1eb95989f6a5 = function () {
        return h(function (e, t, r, _, s, c) {
          const url = v(_, s).replace(
            'https://typst.app',
            self.location.origin,
          );
          // const url = v(_, s);

          i(e).open(v(t, r), url, c !== 0);
        }, arguments);
      }),
      (n.wbg.__wbg_send_9f5007eae908c72e = function () {
        return h(function (e) {
          try {
            i(e).send();
          } catch {}
        }, arguments);
      }),
      (n.wbg.__wbg_get_44be0491f933a435 = function (e, t) {
        const r = i(e)[t >>> 0];
        return u(r);
      }),
      (n.wbg.__wbg_length_fff51ee6522a1a18 = function (e) {
        return i(e).length;
      }),
      (n.wbg.__wbg_new_898a68150f225f2e = function () {
        const e = [];
        return u(e);
      }),
      (n.wbg.__wbindgen_is_function = function (e) {
        return typeof i(e) == 'function';
      }),
      (n.wbg.__wbg_next_526fc47e980da008 = function (e) {
        const t = i(e).next;
        return u(t);
      }),
      (n.wbg.__wbg_next_ddb3312ca1c4e32a = function () {
        return h(function (e) {
          const t = i(e).next();
          return u(t);
        }, arguments);
      }),
      (n.wbg.__wbg_done_5c1f01fb660d73b5 = function (e) {
        return i(e).done;
      }),
      (n.wbg.__wbg_value_1695675138684bd5 = function (e) {
        const t = i(e).value;
        return u(t);
      }),
      (n.wbg.__wbg_iterator_97f0c81209c6c35a = function () {
        return u(Symbol.iterator);
      }),
      (n.wbg.__wbg_get_97b561fb56f034b5 = function () {
        return h(function (e, t) {
          const r = Reflect.get(i(e), i(t));
          return u(r);
        }, arguments);
      }),
      (n.wbg.__wbg_call_cb65541d95d71282 = function () {
        return h(function (e, t) {
          const r = i(e).call(i(t));
          return u(r);
        }, arguments);
      }),
      (n.wbg.__wbg_new_b51585de1b234aff = function () {
        const e = new Object();
        return u(e);
      }),
      (n.wbg.__wbg_set_502d29070ea18557 = function (e, t, r) {
        i(e)[t >>> 0] = f(r);
      }),
      (n.wbg.__wbg_isArray_4c24b343cb13cfb1 = function (e) {
        return Array.isArray(i(e));
      }),
      (n.wbg.__wbg_push_ca1c26067ef907ac = function (e, t) {
        return i(e).push(i(t));
      }),
      (n.wbg.__wbg_instanceof_ArrayBuffer_39ac22089b74fddb = function (e) {
        let t;
        try {
          t = i(e) instanceof ArrayBuffer;
        } catch {
          t = !1;
        }
        return t;
      }),
      (n.wbg.__wbg_new_293890cc937863ee = function (e) {
        const t = new ArrayBuffer(e >>> 0);
        return u(t);
      }),
      (n.wbg.__wbg_isSafeInteger_bb8e18dd21c97288 = function (e) {
        return Number.isSafeInteger(i(e));
      }),
      (n.wbg.__wbg_getTime_5e2054f832d82ec9 = function (e) {
        return i(e).getTime();
      }),
      (n.wbg.__wbg_getTimezoneOffset_8aee3445f323973e = function (e) {
        return i(e).getTimezoneOffset();
      }),
      (n.wbg.__wbg_new_cd59bfc8881f487b = function (e) {
        const t = new Date(i(e));
        return u(t);
      }),
      (n.wbg.__wbg_new0_c0be7df4b6bd481f = function () {
        return u(new Date());
      }),
      (n.wbg.__wbg_entries_e51f29c7bba0c054 = function (e) {
        const t = Object.entries(i(e));
        return u(t);
      }),
      (n.wbg.__wbg_buffer_085ec1f694018c4f = function (e) {
        const t = i(e).buffer;
        return u(t);
      }),
      (n.wbg.__wbg_new_8125e318e6245eed = function (e) {
        const t = new Uint8Array(i(e));
        return u(t);
      }),
      (n.wbg.__wbg_set_5cf90238115182c3 = function (e, t, r) {
        i(e).set(i(t), r >>> 0);
      }),
      (n.wbg.__wbg_length_72e2208bbc0efc61 = function (e) {
        return i(e).length;
      }),
      (n.wbg.__wbg_newwithbyteoffsetandlength_a624c98280289b0f = function (
        e,
        t,
        r,
      ) {
        const _ = new Uint8ClampedArray(i(e), t >>> 0, r >>> 0);
        return u(_);
      }),
      (n.wbg.__wbg_new_e494528481cdbfa3 = function (e) {
        const t = new Uint8ClampedArray(i(e));
        return u(t);
      }),
      (n.wbg.__wbg_set_04f8a7413234f0d4 = function (e, t, r) {
        i(e).set(i(t), r >>> 0);
      }),
      (n.wbg.__wbg_length_73ee164921b200c7 = function (e) {
        return i(e).length;
      }),
      (n.wbg.__wbg_newwithbyteoffsetandlength_6df0e8c3efd2a5d3 = function (
        e,
        t,
        r,
      ) {
        const _ = new Uint32Array(i(e), t >>> 0, r >>> 0);
        return u(_);
      }),
      (n.wbg.__wbg_new_fcbee3dadeecfb4d = function (e) {
        const t = new Uint32Array(i(e));
        return u(t);
      }),
      (n.wbg.__wbg_instanceof_Uint8Array_d8d9cb2b8e8ac1d4 = function (e) {
        let t;
        try {
          t = i(e) instanceof Uint8Array;
        } catch {
          t = !1;
        }
        return t;
      }),
      (n.wbg.__wbg_newwithlength_850a1ef87dba4897 = function (e) {
        const t = new Uint32Array(e >>> 0);
        return u(t);
      }),
      (n.wbg.__wbg_set_092e06b0f9d71865 = function () {
        return h(function (e, t, r) {
          return Reflect.set(i(e), i(t), i(r));
        }, arguments);
      }),
      (n.wbg.__wbindgen_bigint_get_as_i64 = function (e, t) {
        const r = i(t),
          _ = typeof r == 'bigint' ? r : void 0;
        (q()[e / 8 + 1] = m(_) ? BigInt(0) : _), (a()[e / 4 + 0] = !m(_));
      }),
      (n.wbg.__wbindgen_debug_string = function (e, t) {
        const r = B(i(t)),
          _ = l(r, o.__wbindgen_malloc, o.__wbindgen_realloc),
          s = w;
        (a()[e / 4 + 1] = s), (a()[e / 4 + 0] = _);
      }),
      (n.wbg.__wbindgen_throw = function (e, t) {
        throw new Error(v(e, t));
      }),
      (n.wbg.__wbindgen_memory = function () {
        const e = o.memory;
        return u(e);
      }),
      n
    );
  }
  function X(n, e) {
    return (
      (o = n.exports),
      (F.__wbindgen_wasm_module = e),
      (U = null),
      (j = null),
      (T = null),
      (I = null),
      (k = null),
      o
    );
  }
  async function F(n) {
    if (o !== void 0) return o;
    typeof n > 'u' && (n = new URL('/assets/typst.wasm', self.location));
    const e = V();
    (typeof n == 'string' ||
      (typeof Request == 'function' && n instanceof Request) ||
      (typeof URL == 'function' && n instanceof URL)) &&
      (n = fetch(n));
    const { instance: t, module: r } = await J(await n, e);
    return X(t, r);
  }
  let R,
    g = null;
  const $ = typeof performance.now == 'function';
  F().then(() => {
    (R = new S()),
      (onmessage = (n) => {
        try {
          const e = n.data;
          let t;
          if (
            ('uiTasks' in e &&
              e.uiTasks.type === 'uiTasks' &&
              e.uiTasks.transient.length > 0 &&
              ((t = e.uiTasks.previewed ?? void 0),
              (e.uiTasks.previewed = null)),
            E(G(e)),
            'uiTasks' in e)
          ) {
            const r = g,
              _ = e.uiTasks;
            if (_.type === 'pending')
              throw new Error('no pending UI tasks must be sent to the worker');
            if (_.type === 'uiTasks') {
              if (
                (_.edited !== null &&
                  E({
                    kind: 'highlight',
                    ...y(() =>
                      r.highlight(
                        _.edited.fileId,
                        Uint32Array.from(_.edited.ranges),
                      ),
                    ),
                  }),
                _.previewed !== null)
              ) {
                const { result: s, duration: c } = y(() =>
                  r.typeset(_.previewed, _.link?.fileId, _.link?.pos),
                );
                s !== void 0 && E({ kind: 'typeset', result: s, duration: c });
              }
              if (_.transient.length > 0 && t !== void 0) {
                const { result: s, duration: c } = y(() =>
                  r.transient_typeset(t, _.transient),
                );
                s !== void 0 && E({ kind: 'typeset', result: s, duration: c });
              }
            }
          }
        } catch (e) {
          console.error(e), E({ kind: 'crashed' });
        }
      }),
      postMessage({});
  });
  function G(n) {
    if (g === null)
      switch (n.kind) {
        case 'tags':
          return { kind: 'tags', result: R.tags() };
        case 'initialize':
          return (g = R.build(n.files)), { kind: 'initialize', result: void 0 };
        case 'fontPreviews':
          return { kind: 'fontPreviews', result: R.font_previews() };
        default:
          throw new Error('Unexpected task before initialization');
      }
    else if (n.kind === 'initialize') throw new Error('Already initialized');
    if ('changes' in n && n.changes.length === 0)
      return { kind: n.kind, result: [] };
    switch (n.kind) {
      case 'update':
        return { kind: 'update', ...y(() => g.update(n.changes)) };
      case 'setSource':
        return { kind: 'setSource', ...y(() => g.set_source(n.changes)) };
      case 'setBuffer':
        return { kind: 'setBuffer', ...y(() => g.set_buffer(n.changes)) };
      case 'delete':
        return { kind: 'delete', result: g.delete(n.fileIds) };
      case 'autocomplete':
        return {
          kind: 'autocomplete',
          result: g.autocomplete(n.fileId, n.cursor, n.explicit),
        };
      case 'tooltip':
        return { kind: 'tooltip', result: g.tooltip(n.fileId, n.cursor) };
      case 'jumpToSource':
        return {
          kind: 'jumpToSource',
          result: g.jump_to_source(n.index, n.x, n.y),
        };
      case 'fontPreviews':
        return { kind: 'fontPreviews', result: g.font_previews() };
      case 'highlightBibtex':
        return {
          kind: 'highlightBibtex',
          result: g.bibtex_highlight(n.fileId),
        };
      case 'highlightString':
        return {
          kind: 'highlightString',
          result: g.string_highlight(n.string, n.ranges),
        };
      case 'references':
        return { kind: 'references', result: g.references() };
      case 'export':
        return {
          kind: 'export',
          ...y(() => {
            let e = null;
            const t = g.export(n.fileId);
            if (t) {
              const r = new Blob([t]);
              e = URL.createObjectURL(r);
            }
            return e;
          }),
        };
      case 'zip': {
        const e = g.zip(),
          t = new Blob([e]);
        return { kind: 'zip', result: URL.createObjectURL(t) };
      }
      case 'measure':
        return { kind: 'measure', ...y(() => g.measure()) };
      case 'render':
        return {
          kind: 'render',
          index: n.index,
          ...y(() => g.render(n.index, n.zoom)),
        };
      case 'tags':
        return { kind: n.kind, result: g.tags() };
      default:
        return { kind: 'crashed', result: void 0 };
    }
  }
  function y(n) {
    const e = $ ? performance.now() : null,
      t = n(),
      r = $ ? performance.now() : null;
    return { result: t, duration: r !== null && e !== null ? r - e : void 0 };
  }
  function E(n) {
    postMessage(n);
  }
})();
