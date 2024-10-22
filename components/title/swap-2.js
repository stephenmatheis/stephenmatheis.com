const co = "DEPARTURE", Ua = "MONO", id = { E: "3Î£Îžâ‚¬ÆŽ", A: "Î›", R: "2â‚¹", T: "7", U: "É„", " ": "_", O: "0", N: "Æ" };
function sd() {
    const [x, s] = Tr(co), [r, u] = Tr(" "), [n, i] = Tr(Ua);
    function p(y, o) {
        const c = Yn.sample(o);
        if (c === 0) return y;
        const d = [...y], l = y.length === 1 ? [0] : Yn.permutation(xr.of(y.length));
        for (let h = 0; h < c; h++) d[l[h]] = Yn.sample([...id[y[l[h]]] ?? y[l[h]]]);
        return d.join("");
    }

    Fi(() => {
        (function y() {
            if (s(p(co, [0, 0, 0, 1, 1, 2, 2, 2, 3])), Math.random() < .1) {
                const o = Yn.natural(1600) + 400, c = p(co, [2, 3, 4, 4, 5, 5, 5, 6, 6]);
                setTimeout(() => s(co), o);
                setTimeout(() => s(c), o + 30);
                setTimeout(() => s(co), o + 30 * 2);
                setTimeout(() => s(c), o + 30 * 3);
                setTimeout(y, o + 30 * 4);
            } else setTimeout(y, Yn.natural(1600) + 400);
        })(), function y() {
            u(p(" ", [0, 1, 1]));
            setTimeout(y, Yn.natural(1600) + 400);
        }(), function y() {
            if (i(p(Ua, [0, 0, 0, 1, 1, 2, 2])), Math.random() < .1) {
                const o = Yn.natural(1600) + 400, c = p(co, [1, 1, 2, 2, 3, 3]);
                setTimeout(() => s(co), o);
                setTimeout(() => s(c), o + 30);
                setTimeout(() => s(co), o + 30 * 2);
                setTimeout(() => s(c), o + 30 * 3);
                setTimeout(y, o + 30 * 4);
            } else setTimeout(y, Yn.natural(1600) + 400);
        }();
    });
}
