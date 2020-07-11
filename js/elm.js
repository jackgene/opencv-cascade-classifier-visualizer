(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.aH.U === region.aW.U)
	{
		return 'on line ' + region.aH.U;
	}
	return 'on lines ' + region.aH.U + ' through ' + region.aW.U;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (typeof x.$ === 'undefined')
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**_UNUSED/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.cn,
		impl.c3,
		impl.cW,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		C: func(record.C),
		aI: record.aI,
		aC: record.aC
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.C;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.aI;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.aC) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.cn,
		impl.c3,
		impl.cW,
		function(sendToApp, initialModel) {
			var view = impl.c6;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.cn,
		impl.c3,
		impl.cW,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.aF && impl.aF(sendToApp)
			var view = impl.c6;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.bR);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.c1) && (_VirtualDom_doc.title = title = doc.c1);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.cC;
	var onUrlRequest = impl.cD;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		aF: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.bu === next.bu
							&& curr.a2 === next.a2
							&& curr.bp.a === next.bp.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		cn: function(flags)
		{
			return A3(impl.cn, flags, _Browser_getUrl(), key);
		},
		c6: impl.c6,
		c3: impl.c3,
		cW: impl.cW
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { cj: 'hidden', bX: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { cj: 'mozHidden', bX: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { cj: 'msHidden', bX: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { cj: 'webkitHidden', bX: 'webkitvisibilitychange' }
		: { cj: 'hidden', bX: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		bD: _Browser_getScene(),
		aK: {
			da: _Browser_window.pageXOffset,
			db: _Browser_window.pageYOffset,
			bL: _Browser_doc.documentElement.clientWidth,
			a1: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		bL: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		a1: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			bD: {
				bL: node.scrollWidth,
				a1: node.scrollHeight
			},
			aK: {
				da: node.scrollLeft,
				db: node.scrollTop,
				bL: node.clientWidth,
				a1: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			bD: _Browser_getScene(),
			aK: {
				da: x,
				db: y,
				bL: _Browser_doc.documentElement.clientWidth,
				a1: _Browser_doc.documentElement.clientHeight
			},
			at: {
				da: x + rect.left,
				db: y + rect.top,
				bL: rect.width,
				a1: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



// DECODER

var _File_decoder = _Json_decodePrim(function(value) {
	// NOTE: checks if `File` exists in case this is run on node
	return (typeof File !== 'undefined' && value instanceof File)
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FILE', value);
});


// METADATA

function _File_name(file) { return file.name; }
function _File_mime(file) { return file.type; }
function _File_size(file) { return file.size; }

function _File_lastModified(file)
{
	return $elm$time$Time$millisToPosix(file.lastModified);
}


// DOWNLOAD

var _File_downloadNode;

function _File_getDownloadNode()
{
	return _File_downloadNode || (_File_downloadNode = document.createElement('a'));
}

var _File_download = F3(function(name, mime, content)
{
	return _Scheduler_binding(function(callback)
	{
		var blob = new Blob([content], {type: mime});

		// for IE10+
		if (navigator.msSaveOrOpenBlob)
		{
			navigator.msSaveOrOpenBlob(blob, name);
			return;
		}

		// for HTML5
		var node = _File_getDownloadNode();
		var objectUrl = URL.createObjectURL(blob);
		node.href = objectUrl;
		node.download = name;
		_File_click(node);
		URL.revokeObjectURL(objectUrl);
	});
});

function _File_downloadUrl(href)
{
	return _Scheduler_binding(function(callback)
	{
		var node = _File_getDownloadNode();
		node.href = href;
		node.download = '';
		node.origin === location.origin || (node.target = '_blank');
		_File_click(node);
	});
}


// IE COMPATIBILITY

function _File_makeBytesSafeForInternetExplorer(bytes)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/10
	// all other browsers can just run `new Blob([bytes])` directly with no problem
	//
	return new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
}

function _File_click(node)
{
	// only needed by IE10 and IE11 to fix https://github.com/elm/file/issues/11
	// all other browsers have MouseEvent and do not need this conditional stuff
	//
	if (typeof MouseEvent === 'function')
	{
		node.dispatchEvent(new MouseEvent('click'));
	}
	else
	{
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		document.body.appendChild(node);
		node.dispatchEvent(event);
		document.body.removeChild(node);
	}
}


// UPLOAD

var _File_node;

function _File_uploadOne(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.accept = A2($elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			callback(_Scheduler_succeed(event.target.files[0]));
		});
		_File_click(_File_node);
	});
}

function _File_uploadOneOrMore(mimes)
{
	return _Scheduler_binding(function(callback)
	{
		_File_node = document.createElement('input');
		_File_node.type = 'file';
		_File_node.multiple = true;
		_File_node.accept = A2($elm$core$String$join, ',', mimes);
		_File_node.addEventListener('change', function(event)
		{
			var elmFiles = _List_fromArray(event.target.files);
			callback(_Scheduler_succeed(_Utils_Tuple2(elmFiles.a, elmFiles.b)));
		});
		_File_click(_File_node);
	});
}


// CONTENT

function _File_toString(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsText(blob);
		return function() { reader.abort(); };
	});
}

function _File_toBytes(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(new DataView(reader.result)));
		});
		reader.readAsArrayBuffer(blob);
		return function() { reader.abort(); };
	});
}

function _File_toUrl(blob)
{
	return _Scheduler_binding(function(callback)
	{
		var reader = new FileReader();
		reader.addEventListener('loadend', function() {
			callback(_Scheduler_succeed(reader.result));
		});
		reader.readAsDataURL(blob);
		return function() { reader.abort(); };
	});
}



// BYTES

function _Bytes_width(bytes)
{
	return bytes.byteLength;
}

var _Bytes_getHostEndianness = F2(function(le, be)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(new Uint8Array(new Uint32Array([1]))[0] === 1 ? le : be));
	});
});


// ENCODERS

function _Bytes_encode(encoder)
{
	var mutableBytes = new DataView(new ArrayBuffer($elm$bytes$Bytes$Encode$getWidth(encoder)));
	$elm$bytes$Bytes$Encode$write(encoder)(mutableBytes)(0);
	return mutableBytes;
}


// SIGNED INTEGERS

var _Bytes_write_i8  = F3(function(mb, i, n) { mb.setInt8(i, n); return i + 1; });
var _Bytes_write_i16 = F4(function(mb, i, n, isLE) { mb.setInt16(i, n, isLE); return i + 2; });
var _Bytes_write_i32 = F4(function(mb, i, n, isLE) { mb.setInt32(i, n, isLE); return i + 4; });


// UNSIGNED INTEGERS

var _Bytes_write_u8  = F3(function(mb, i, n) { mb.setUint8(i, n); return i + 1 ;});
var _Bytes_write_u16 = F4(function(mb, i, n, isLE) { mb.setUint16(i, n, isLE); return i + 2; });
var _Bytes_write_u32 = F4(function(mb, i, n, isLE) { mb.setUint32(i, n, isLE); return i + 4; });


// FLOATS

var _Bytes_write_f32 = F4(function(mb, i, n, isLE) { mb.setFloat32(i, n, isLE); return i + 4; });
var _Bytes_write_f64 = F4(function(mb, i, n, isLE) { mb.setFloat64(i, n, isLE); return i + 8; });


// BYTES

var _Bytes_write_bytes = F3(function(mb, offset, bytes)
{
	for (var i = 0, len = bytes.byteLength, limit = len - 4; i <= limit; i += 4)
	{
		mb.setUint32(offset + i, bytes.getUint32(i));
	}
	for (; i < len; i++)
	{
		mb.setUint8(offset + i, bytes.getUint8(i));
	}
	return offset + len;
});


// STRINGS

function _Bytes_getStringWidth(string)
{
	for (var width = 0, i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		width +=
			(code < 0x80) ? 1 :
			(code < 0x800) ? 2 :
			(code < 0xD800 || 0xDBFF < code) ? 3 : (i++, 4);
	}
	return width;
}

var _Bytes_write_string = F3(function(mb, offset, string)
{
	for (var i = 0; i < string.length; i++)
	{
		var code = string.charCodeAt(i);
		offset +=
			(code < 0x80)
				? (mb.setUint8(offset, code)
				, 1
				)
				:
			(code < 0x800)
				? (mb.setUint16(offset, 0xC080 /* 0b1100000010000000 */
					| (code >>> 6 & 0x1F /* 0b00011111 */) << 8
					| code & 0x3F /* 0b00111111 */)
				, 2
				)
				:
			(code < 0xD800 || 0xDBFF < code)
				? (mb.setUint16(offset, 0xE080 /* 0b1110000010000000 */
					| (code >>> 12 & 0xF /* 0b00001111 */) << 8
					| code >>> 6 & 0x3F /* 0b00111111 */)
				, mb.setUint8(offset + 2, 0x80 /* 0b10000000 */
					| code & 0x3F /* 0b00111111 */)
				, 3
				)
				:
			(code = (code - 0xD800) * 0x400 + string.charCodeAt(++i) - 0xDC00 + 0x10000
			, mb.setUint32(offset, 0xF0808080 /* 0b11110000100000001000000010000000 */
				| (code >>> 18 & 0x7 /* 0b00000111 */) << 24
				| (code >>> 12 & 0x3F /* 0b00111111 */) << 16
				| (code >>> 6 & 0x3F /* 0b00111111 */) << 8
				| code & 0x3F /* 0b00111111 */)
			, 4
			);
	}
	return offset;
});


// DECODER

var _Bytes_decode = F2(function(decoder, bytes)
{
	try {
		return $elm$core$Maybe$Just(A2(decoder, bytes, 0).b);
	} catch(e) {
		return $elm$core$Maybe$Nothing;
	}
});

var _Bytes_read_i8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getInt8(offset)); });
var _Bytes_read_i16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getInt16(offset, isLE)); });
var _Bytes_read_i32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getInt32(offset, isLE)); });
var _Bytes_read_u8  = F2(function(      bytes, offset) { return _Utils_Tuple2(offset + 1, bytes.getUint8(offset)); });
var _Bytes_read_u16 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 2, bytes.getUint16(offset, isLE)); });
var _Bytes_read_u32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getUint32(offset, isLE)); });
var _Bytes_read_f32 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 4, bytes.getFloat32(offset, isLE)); });
var _Bytes_read_f64 = F3(function(isLE, bytes, offset) { return _Utils_Tuple2(offset + 8, bytes.getFloat64(offset, isLE)); });

var _Bytes_read_bytes = F3(function(len, bytes, offset)
{
	return _Utils_Tuple2(offset + len, new DataView(bytes.buffer, bytes.byteOffset + offset, len));
});

var _Bytes_read_string = F3(function(len, bytes, offset)
{
	var string = '';
	var end = offset + len;
	for (; offset < end;)
	{
		var byte = bytes.getUint8(offset++);
		string +=
			(byte < 128)
				? String.fromCharCode(byte)
				:
			((byte & 0xE0 /* 0b11100000 */) === 0xC0 /* 0b11000000 */)
				? String.fromCharCode((byte & 0x1F /* 0b00011111 */) << 6 | bytes.getUint8(offset++) & 0x3F /* 0b00111111 */)
				:
			((byte & 0xF0 /* 0b11110000 */) === 0xE0 /* 0b11100000 */)
				? String.fromCharCode(
					(byte & 0xF /* 0b00001111 */) << 12
					| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
					| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
				)
				:
				(byte =
					((byte & 0x7 /* 0b00000111 */) << 18
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 12
						| (bytes.getUint8(offset++) & 0x3F /* 0b00111111 */) << 6
						| bytes.getUint8(offset++) & 0x3F /* 0b00111111 */
					) - 0x10000
				, String.fromCharCode(Math.floor(byte / 0x400) + 0xD800, byte % 0x400 + 0xDC00)
				);
	}
	return _Utils_Tuple2(offset, string);
});

var _Bytes_decodeFailure = F2(function() { throw 0; });
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = 1;
var $elm$core$Basics$GT = 2;
var $elm$core$Basics$LT = 0;
var $elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var $elm$core$Basics$False = 1;
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Maybe$Nothing = {$: 1};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 1) {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.f) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.i),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.i);
		} else {
			var treeLen = builder.f * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.j) : builder.j;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.f);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.i) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.i);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{j: nodeList, f: (len / $elm$core$Array$branchFactor) | 0, i: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = 0;
var $elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = $elm$core$Basics$identity;
var $elm$url$Url$Http = 0;
var $elm$url$Url$Https = 1;
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {a0: fragment, a2: host, bn: path, bp: port_, bu: protocol, bv: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 1) {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		0,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		1,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = $elm$core$Basics$identity;
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return 0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0;
		return A2($elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			A2($elm$core$Task$map, toMessage, task));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Common$RenderedImageSize = function (a) {
	return {$: 11, a: a};
};
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			A2(
				$elm$core$Task$onError,
				A2(
					$elm$core$Basics$composeL,
					A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
					$elm$core$Result$Err),
				A2(
					$elm$core$Task$andThen,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Ok),
					task)));
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $author$project$Common$Cascade = F2(
	function (size, stages) {
		return {aG: size, bG: stages};
	});
var $author$project$Common$Size = F2(
	function (width, height) {
		return {a1: height, bL: width};
	});
var $author$project$Common$Stage = F2(
	function (threshold, weakClassifiers) {
		return {bJ: threshold, c7: weakClassifiers};
	});
var $author$project$Common$WeakClassifier = F3(
	function (feature, threshold, leafValues) {
		return {cd: feature, cr: leafValues, bJ: threshold};
	});
var $elm$json$Json$Decode$array = _Json_decodeArray;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		if (ma.$ === 1) {
			return $elm$core$Maybe$Nothing;
		} else {
			var a = ma.a;
			if (mb.$ === 1) {
				return $elm$core$Maybe$Nothing;
			} else {
				var b = mb.a;
				return $elm$core$Maybe$Just(
					A2(func, a, b));
			}
		}
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $elm$core$String$toFloat = _String_toFloat;
var $elm$core$String$trim = _String_trim;
var $author$project$Main$decodeSpaceDelimitedFloatPair = function (spaceDelimited) {
	var _v0 = A2(
		$elm$core$String$split,
		' ',
		$elm$core$String$trim(spaceDelimited));
	if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
		var leftStr = _v0.a;
		var _v1 = _v0.b;
		var rightStr = _v1.a;
		return A3(
			$elm$core$Maybe$map2,
			$elm$core$Tuple$pair,
			$elm$core$String$toFloat(leftStr),
			$elm$core$String$toFloat(rightStr));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Main$decodeSpaceDelimitedInternalNode = function (spaceDelimited) {
	var _v0 = A2(
		$elm$core$String$split,
		' ',
		$elm$core$String$trim(spaceDelimited));
	if ((((_v0.b && _v0.b.b) && _v0.b.b.b) && _v0.b.b.b.b) && (!_v0.b.b.b.b.b)) {
		var _v1 = _v0.b;
		var _v2 = _v1.b;
		var featureIdxStr = _v2.a;
		var _v3 = _v2.b;
		var thresholdStr = _v3.a;
		return A3(
			$elm$core$Maybe$map2,
			$elm$core$Tuple$pair,
			$elm$core$String$toInt(featureIdxStr),
			$elm$core$String$toFloat(thresholdStr));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$json$Json$Decode$fail = _Json_fail;
var $author$project$Common$Feature = F2(
	function (cells, tilted) {
		return {bW: cells, c0: tilted};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $author$project$Common$Cell = F2(
	function (rect, factor) {
		return {cc: factor, cN: rect};
	});
var $author$project$Common$Point = F2(
	function (x, y) {
		return {da: x, db: y};
	});
var $author$project$Common$Rect = F2(
	function (location, size) {
		return {cs: location, aG: size};
	});
var $author$project$Main$decodeSpaceDelimitedCell = function (spaceDelimited) {
	var _v0 = A2(
		$elm$core$String$split,
		' ',
		$elm$core$String$trim(spaceDelimited));
	if (((((_v0.b && _v0.b.b) && _v0.b.b.b) && _v0.b.b.b.b) && _v0.b.b.b.b.b) && (!_v0.b.b.b.b.b.b)) {
		var xStr = _v0.a;
		var _v1 = _v0.b;
		var yStr = _v1.a;
		var _v2 = _v1.b;
		var wStr = _v2.a;
		var _v3 = _v2.b;
		var hStr = _v3.a;
		var _v4 = _v3.b;
		var factorStr = _v4.a;
		return A3(
			$elm$core$Maybe$map2,
			$author$project$Common$Cell,
			A3(
				$elm$core$Maybe$map2,
				$author$project$Common$Rect,
				A3(
					$elm$core$Maybe$map2,
					$author$project$Common$Point,
					$elm$core$String$toInt(xStr),
					$elm$core$String$toInt(yStr)),
				A3(
					$elm$core$Maybe$map2,
					$author$project$Common$Size,
					$elm$core$String$toInt(wStr),
					$elm$core$String$toInt(hStr))),
			$elm$core$String$toFloat(factorStr));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Main$featureJsonDecoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Common$Feature,
	A2(
		$elm$json$Json$Decode$at,
		_List_fromArray(
			['rects', '_']),
		$elm$json$Json$Decode$list(
			A2(
				$elm$json$Json$Decode$andThen,
				function (spaceDelimitedRect) {
					var _v0 = $author$project$Main$decodeSpaceDelimitedCell(spaceDelimitedRect);
					if (!_v0.$) {
						var rect = _v0.a;
						return $elm$json$Json$Decode$succeed(rect);
					} else {
						return $elm$json$Json$Decode$fail('Unable to parse rect string');
					}
				},
				$elm$json$Json$Decode$string))),
	A2(
		$elm$json$Json$Decode$map,
		$elm$core$Maybe$withDefault(false),
		$elm$json$Json$Decode$maybe(
			A2($elm$json$Json$Decode$field, 'tilted', $elm$json$Json$Decode$bool))));
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Basics$ge = _Utils_ge;
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Main$cascadeNewJsonDecoder = A2(
	$elm$json$Json$Decode$andThen,
	function (features) {
		return A3(
			$elm$json$Json$Decode$map2,
			$author$project$Common$Cascade,
			A3(
				$elm$json$Json$Decode$map2,
				$author$project$Common$Size,
				A2(
					$elm$json$Json$Decode$at,
					_List_fromArray(
						['opencv_storage', 'cascade', 'width']),
					$elm$json$Json$Decode$int),
				A2(
					$elm$json$Json$Decode$at,
					_List_fromArray(
						['opencv_storage', 'cascade', 'height']),
					$elm$json$Json$Decode$int)),
			A2(
				$elm$json$Json$Decode$at,
				_List_fromArray(
					['opencv_storage', 'cascade', 'stages', '_']),
				$elm$json$Json$Decode$array(
					A3(
						$elm$json$Json$Decode$map2,
						$author$project$Common$Stage,
						A2($elm$json$Json$Decode$field, 'stageThreshold', $elm$json$Json$Decode$float),
						A2(
							$elm$json$Json$Decode$at,
							_List_fromArray(
								['weakClassifiers', '_']),
							$elm$json$Json$Decode$array(
								A2(
									$elm$json$Json$Decode$andThen,
									function (_v0) {
										var featureIdx = _v0.a;
										var threshold = _v0.b;
										var leafValues = _v0.c;
										var _v1 = A2($elm$core$Array$get, featureIdx, features);
										if (!_v1.$) {
											var feature = _v1.a;
											return $elm$json$Json$Decode$succeed(
												A3($author$project$Common$WeakClassifier, feature, threshold, leafValues));
										} else {
											return $elm$json$Json$Decode$fail(
												'feature index ' + ($elm$core$String$fromInt(featureIdx) + 'is out of range'));
										}
									},
									A3(
										$elm$json$Json$Decode$map2,
										function (_v2) {
											var featureIdx = _v2.a;
											var threshold = _v2.b;
											return function (leafValues) {
												return _Utils_Tuple3(featureIdx, threshold, leafValues);
											};
										},
										A2(
											$elm$json$Json$Decode$field,
											'internalNodes',
											A2(
												$elm$json$Json$Decode$andThen,
												function (spaceDelimitedInternalNodes) {
													var _v3 = $author$project$Main$decodeSpaceDelimitedInternalNode(spaceDelimitedInternalNodes);
													if (!_v3.$) {
														var featureIdxThreshold = _v3.a;
														return $elm$json$Json$Decode$succeed(featureIdxThreshold);
													} else {
														return $elm$json$Json$Decode$fail('Unable to parse internalNodes string');
													}
												},
												$elm$json$Json$Decode$string)),
										A2(
											$elm$json$Json$Decode$field,
											'leafValues',
											A2(
												$elm$json$Json$Decode$andThen,
												function (spaceDelimitedPair) {
													var _v4 = $author$project$Main$decodeSpaceDelimitedFloatPair(spaceDelimitedPair);
													if (!_v4.$) {
														var leafValues = _v4.a;
														return $elm$json$Json$Decode$succeed(leafValues);
													} else {
														return $elm$json$Json$Decode$fail('Unable to parse leafValues string');
													}
												},
												$elm$json$Json$Decode$string))))))))));
	},
	A2(
		$elm$json$Json$Decode$at,
		_List_fromArray(
			['opencv_storage', 'cascade', 'features', '_']),
		$elm$json$Json$Decode$array($author$project$Main$featureJsonDecoder)));
var $author$project$Main$decodeSpaceDelimitedSize = function (spaceDelimited) {
	var _v0 = A2(
		$elm$core$String$split,
		' ',
		$elm$core$String$trim(spaceDelimited));
	if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
		var widthStr = _v0.a;
		var _v1 = _v0.b;
		var heightStr = _v1.a;
		return A3(
			$elm$core$Maybe$map2,
			$author$project$Common$Size,
			$elm$core$String$toInt(widthStr),
			$elm$core$String$toInt(heightStr));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$json$Json$Decode$map3 = _Json_map3;
var $author$project$Main$cascadeOldJsonDecoder = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['opencv_storage', 'cascade']),
	A3(
		$elm$json$Json$Decode$map2,
		$author$project$Common$Cascade,
		A2(
			$elm$json$Json$Decode$andThen,
			function (spaceDelimitedSize) {
				var _v0 = $author$project$Main$decodeSpaceDelimitedSize(spaceDelimitedSize);
				if (!_v0.$) {
					var cascade = _v0.a;
					return $elm$json$Json$Decode$succeed(cascade);
				} else {
					return $elm$json$Json$Decode$fail('Unable to parse size string');
				}
			},
			A2($elm$json$Json$Decode$field, 'size', $elm$json$Json$Decode$string)),
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['stages', '_']),
			$elm$json$Json$Decode$array(
				A3(
					$elm$json$Json$Decode$map2,
					$author$project$Common$Stage,
					A2(
						$elm$json$Json$Decode$at,
						_List_fromArray(
							['stage_threshold']),
						$elm$json$Json$Decode$float),
					A2(
						$elm$json$Json$Decode$at,
						_List_fromArray(
							['trees', '_']),
						$elm$json$Json$Decode$array(
							A2(
								$elm$json$Json$Decode$field,
								'_',
								A4(
									$elm$json$Json$Decode$map3,
									$author$project$Common$WeakClassifier,
									A2($elm$json$Json$Decode$field, 'feature', $author$project$Main$featureJsonDecoder),
									A2($elm$json$Json$Decode$field, 'threshold', $elm$json$Json$Decode$float),
									A3(
										$elm$json$Json$Decode$map2,
										$elm$core$Tuple$pair,
										A2($elm$json$Json$Decode$field, 'left_val', $elm$json$Json$Decode$float),
										A2($elm$json$Json$Decode$field, 'right_val', $elm$json$Json$Decode$float)))))))))));
var $author$project$Main$cascadeJsonDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[$author$project$Main$cascadeOldJsonDecoder, $author$project$Main$cascadeNewJsonDecoder]));
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $author$project$Common$defaultImageUrl = 'image/puddings.jpg';
var $author$project$Common$modelColumnWidthPx = 340;
var $author$project$Common$defaultOtherContentWidthPx = $author$project$Common$modelColumnWidthPx + 16;
var $elm$browser$Browser$Dom$getElement = _Browser_getElement;
var $elm$json$Json$Encode$int = _Json_wrap;
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(0),
			pairs));
};
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Main$getImagePixelsCmd = _Platform_outgoingPort(
	'getImagePixelsCmd',
	function ($) {
		return $elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'longEdgePx',
					$elm$json$Json$Encode$int($.af)),
					_Utils_Tuple2(
					'url',
					$elm$json$Json$Encode$string($.c4))
				]));
	});
var $author$project$Common$imageLongEdgePx = 480;
var $author$project$Main$init = function (flags) {
	return _Utils_Tuple2(
		function () {
			var model = {
				bU: {
					aG: {a1: 0, bL: 0},
					bG: $elm$core$Array$empty
				},
				cl: {cx: $elm$core$Maybe$Nothing, c4: $author$project$Common$defaultImageUrl},
				cu: $elm$core$Maybe$Nothing,
				cw: $elm$core$Maybe$Nothing,
				cF: $author$project$Common$defaultOtherContentWidthPx,
				cO: 0
			};
			var _v0 = A2($elm$json$Json$Decode$decodeValue, $author$project$Main$cascadeJsonDecoder, flags.bV);
			if (!_v0.$) {
				var cascade = _v0.a;
				return _Utils_update(
					model,
					{bU: cascade});
			} else {
				var jsonErr = _v0.a;
				return _Utils_update(
					model,
					{
						cw: $elm$core$Maybe$Just(
							$elm$json$Json$Decode$errorToString(jsonErr))
					});
			}
		}(),
		$elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					$author$project$Main$getImagePixelsCmd(
					{af: $author$project$Common$imageLongEdgePx, c4: $author$project$Common$defaultImageUrl}),
					A2(
					$elm$core$Task$attempt,
					$author$project$Common$RenderedImageSize,
					$elm$browser$Browser$Dom$getElement('image'))
				])));
};
var $author$project$Common$CascadeResult = function (a) {
	return {$: 2, a: a};
};
var $author$project$Common$ImagePixels = function (a) {
	return {$: 5, a: a};
};
var $author$project$Common$PerformNextDetectionStep = {$: 9};
var $author$project$Common$WindowWidthPx = function (a) {
	return {$: 10, a: a};
};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {bs: processes, bI: taggers};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = 1;
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = 0;
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5($elm$core$Dict$RBNode_elm_builtin, 0, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1) {
				case 0:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === -1) && (!_v0.a)) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 1) {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.bs;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$Posix = $elm$core$Basics$identity;
var $elm$time$Time$millisToPosix = $elm$core$Basics$identity;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.bI);
		if (_v0.$ === 1) {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $author$project$Main$getImagePixelsSub = _Platform_incomingPort(
	'getImagePixelsSub',
	A2(
		$elm$json$Json$Decode$andThen,
		function (width) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (pixels) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (height) {
							return $elm$json$Json$Decode$succeed(
								{a1: height, cI: pixels, bL: width});
						},
						A2($elm$json$Json$Decode$field, 'height', $elm$json$Json$Decode$int));
				},
				A2(
					$elm$json$Json$Decode$field,
					'pixels',
					$elm$json$Json$Decode$array($elm$json$Json$Decode$int)));
		},
		A2($elm$json$Json$Decode$field, 'width', $elm$json$Json$Decode$int)));
var $elm$core$Elm$JsArray$map = _JsArray_map;
var $elm$core$Array$map = F2(
	function (func, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = function (node) {
			if (!node.$) {
				var subTree = node.a;
				return $elm$core$Array$SubTree(
					A2($elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return $elm$core$Array$Leaf(
					A2($elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2($elm$core$Elm$JsArray$map, helper, tree),
			A2($elm$core$Elm$JsArray$map, func, tail));
	});
var $elm$core$Basics$round = _Basics_round;
var $author$project$Main$grayscale = function (rgbPixels) {
	return A2(
		$elm$core$Array$map,
		function (_v0) {
			var r = _v0.a;
			var g = _v0.b;
			var b = _v0.c;
			return $elm$core$Basics$round(((0.3 * r) + (0.59 * g)) + (0.11 * b));
		},
		rgbPixels);
};
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $elm$core$Elm$JsArray$push = _JsArray_push;
var $elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			$elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					$elm$core$Elm$JsArray$push,
					$elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, $elm$core$Elm$JsArray$empty));
				return A2($elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!value.$) {
				var subTree = value.a;
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, subTree));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4(
						$elm$core$Array$insertTailInTree,
						shift - $elm$core$Array$shiftStep,
						index,
						tail,
						$elm$core$Elm$JsArray$singleton(value)));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var $elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var originalTailLen = $elm$core$Elm$JsArray$length(tail);
		var newTailLen = $elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, $elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> $elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + $elm$core$Array$shiftStep;
				var newTree = A4(
					$elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					$elm$core$Elm$JsArray$singleton(
						$elm$core$Array$SubTree(tree)));
				return A4($elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, $elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4($elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					$elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4($elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var $elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			$elm$core$Array$unsafeReplaceTail,
			A2($elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var $author$project$Main$groupSubPixels = function (subPixels) {
	var _v0 = A3(
		$elm$core$Array$foldl,
		F2(
			function (subPx, _v1) {
				var pxAccum = _v1.a;
				var pxs = _v1.b;
				if (((pxAccum.b && pxAccum.b.b) && pxAccum.b.b.b) && (!pxAccum.b.b.b.b)) {
					var b = pxAccum.a;
					var _v3 = pxAccum.b;
					var g = _v3.a;
					var _v4 = _v3.b;
					var r = _v4.a;
					return _Utils_Tuple2(
						_List_Nil,
						A2(
							$elm$core$Array$push,
							_Utils_Tuple3(r, g, b),
							pxs));
				} else {
					return _Utils_Tuple2(
						A2($elm$core$List$cons, subPx, pxAccum),
						pxs);
				}
			}),
		_Utils_Tuple2(_List_Nil, $elm$core$Array$empty),
		subPixels);
	var pixels = _v0.b;
	return pixels;
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $elm$browser$Browser$Events$Window = 1;
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {bo: pids, bH: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {aX: event, a9: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.bo,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (!_v0.$) {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.a9;
		var event = _v0.aX;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.bH);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Main$parseXmlSub = _Platform_incomingPort('parseXmlSub', $elm$json$Json$Decode$value);
var $author$project$Main$subscriptions = function (model) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Main$getImagePixelsSub(
				function (imgData) {
					return $author$project$Common$ImagePixels(
						{
							b3: $author$project$Main$grayscale(
								$author$project$Main$groupSubPixels(imgData.cI)),
							aG: {a1: imgData.a1, bL: imgData.bL}
						});
				}),
				$author$project$Main$parseXmlSub(
				A2(
					$elm$core$Basics$composeL,
					A2(
						$elm$core$Basics$composeL,
						$author$project$Common$CascadeResult,
						$elm$core$Result$mapError($elm$json$Json$Decode$errorToString)),
					$elm$json$Json$Decode$decodeValue($author$project$Main$cascadeJsonDecoder))),
				function () {
				var _v0 = A2(
					$elm$core$Maybe$map,
					function ($) {
						return $.cV;
					},
					model.cu);
				if ((!_v0.$) && (_v0.a.$ === 1)) {
					var _v1 = _v0.a;
					return A2(
						$elm$time$Time$every,
						250,
						$elm$core$Basics$always($author$project$Common$PerformNextDetectionStep));
				} else {
					return $elm$core$Platform$Sub$none;
				}
			}(),
				$elm$browser$Browser$Events$onResize(
				F2(
					function (w, _v2) {
						return $author$project$Common$WindowWidthPx(w);
					}))
			]));
};
var $author$project$Common$CascadeXml = function (a) {
	return {$: 1, a: a};
};
var $author$project$Common$Failed = {$: 3};
var $author$project$Common$ImageDataUrl = function (a) {
	return {$: 4, a: a};
};
var $author$project$Common$Initializing = {$: 0};
var $author$project$Common$Running = F3(
	function (a, b, c) {
		return {$: 1, a: a, b: b, c: c};
	});
var $author$project$Common$Succeeded = {$: 2};
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.i)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.i, tail);
		return (notAppended < 0) ? {
			j: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.j),
			f: builder.f + 1,
			i: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			j: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.j),
			f: builder.f + 1,
			i: $elm$core$Elm$JsArray$empty
		} : {j: builder.j, f: builder.f, i: appended});
	});
var $elm$core$Array$appendHelpTree = F2(
	function (toAppend, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		var itemsToAppend = $elm$core$Elm$JsArray$length(toAppend);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(tail)) - itemsToAppend;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, tail, toAppend);
		var newArray = A2($elm$core$Array$unsafeReplaceTail, appended, array);
		if (notAppended < 0) {
			var nextTail = A3($elm$core$Elm$JsArray$slice, notAppended, itemsToAppend, toAppend);
			return A2($elm$core$Array$unsafeReplaceTail, nextTail, newArray);
		} else {
			return newArray;
		}
	});
var $elm$core$Array$builderFromArray = function (_v0) {
	var len = _v0.a;
	var tree = _v0.c;
	var tail = _v0.d;
	var helper = F2(
		function (node, acc) {
			if (!node.$) {
				var subTree = node.a;
				return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
			} else {
				return A2($elm$core$List$cons, node, acc);
			}
		});
	return {
		j: A3($elm$core$Elm$JsArray$foldl, helper, _List_Nil, tree),
		f: (len / $elm$core$Array$branchFactor) | 0,
		i: tail
	};
};
var $elm$core$Array$append = F2(
	function (a, _v0) {
		var aTail = a.d;
		var bLen = _v0.a;
		var bTree = _v0.c;
		var bTail = _v0.d;
		if (_Utils_cmp(bLen, $elm$core$Array$branchFactor * 4) < 1) {
			var foldHelper = F2(
				function (node, array) {
					if (!node.$) {
						var tree = node.a;
						return A3($elm$core$Elm$JsArray$foldl, foldHelper, array, tree);
					} else {
						var leaf = node.a;
						return A2($elm$core$Array$appendHelpTree, leaf, array);
					}
				});
			return A2(
				$elm$core$Array$appendHelpTree,
				bTail,
				A3($elm$core$Elm$JsArray$foldl, foldHelper, a, bTree));
		} else {
			var foldHelper = F2(
				function (node, builder) {
					if (!node.$) {
						var tree = node.a;
						return A3($elm$core$Elm$JsArray$foldl, foldHelper, builder, tree);
					} else {
						var leaf = node.a;
						return A2($elm$core$Array$appendHelpBuilder, leaf, builder);
					}
				});
			return A2(
				$elm$core$Array$builderToArray,
				true,
				A2(
					$elm$core$Array$appendHelpBuilder,
					bTail,
					A3(
						$elm$core$Elm$JsArray$foldl,
						foldHelper,
						$elm$core$Array$builderFromArray(a),
						bTree)));
		}
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{j: nodeList, f: nodeListSize, i: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Basics$not = _Basics_not;
var $author$project$Main$parseXmlCmd = _Platform_outgoingPort('parseXmlCmd', $elm$json$Json$Encode$string);
var $author$project$Common$NoOp = {$: 12};
var $elm$browser$Browser$Dom$getViewportOf = _Browser_getViewportOf;
var $elm$browser$Browser$Dom$setViewportOf = _Browser_setViewportOf;
var $author$project$Main$scrollToClassification = function (id) {
	return A2(
		$elm$core$Task$attempt,
		$elm$core$Basics$always($author$project$Common$NoOp),
		A2(
			$elm$core$Task$andThen,
			function (scrollY) {
				return A3($elm$browser$Browser$Dom$setViewportOf, 'model-column', 0, scrollY);
			},
			A3(
				$elm$core$Task$map2,
				F2(
					function (containerInfo, classifierInfo) {
						return containerInfo.aK.db + classifierInfo.at.db;
					}),
				$elm$browser$Browser$Dom$getViewportOf('model-column'),
				$elm$browser$Browser$Dom$getElement(id))));
};
var $elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (!_v0.$) {
			var subTree = _v0.a;
			var newSub = A4($elm$core$Array$setHelp, shift - $elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _v0.a;
			var newLeaf = A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, values);
			return A3(
				$elm$core$Elm$JsArray$unsafeSet,
				pos,
				$elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var $elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3($elm$core$Elm$JsArray$unsafeSet, $elm$core$Array$bitMask & index, value, tail)) : A4(
			$elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4($elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					len - from,
					$elm$core$Array$shiftStep,
					$elm$core$Elm$JsArray$empty,
					A3(
						$elm$core$Elm$JsArray$slice,
						from - $elm$core$Array$tailIndex(len),
						$elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (!node.$) {
							var subTree = node.a;
							return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2($elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					$elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2($elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return $elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
					var initialBuilder = {
						j: _List_Nil,
						f: 0,
						i: A3(
							$elm$core$Elm$JsArray$slice,
							firstSlice,
							$elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						$elm$core$Array$builderToArray,
						true,
						A3($elm$core$List$foldl, $elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var $elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_v0.$) {
				var sub = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _v0.a;
				return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
			}
		}
	});
var $elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (!_v0.$) {
					var sub = _v0.a;
					var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var $elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (!_v0.$) {
			var sub = _v0.a;
			var newSub = A3($elm$core$Array$sliceTree, shift - $elm$core$Array$shiftStep, endIdx, sub);
			return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				$elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				$elm$core$Array$SubTree(newSub),
				A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var $elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = $elm$core$Array$tailIndex(end);
				var depth = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$logBase,
						$elm$core$Array$branchFactor,
						A2($elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep);
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						$elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3($elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4($elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var $elm$core$Array$translateIndex = F2(
	function (index, _v0) {
		var len = _v0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var $elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2($elm$core$Array$translateIndex, to, array);
		var correctFrom = A2($elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : A2(
			$elm$core$Array$sliceLeft,
			correctFrom,
			A2($elm$core$Array$sliceRight, correctTo, array));
	});
var $elm$file$File$toString = _File_toString;
var $elm$file$File$toUrl = _File_toUrl;
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (!maybeValue.$) {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $justgook$elm_image$Image$Internal$ImageData$Array = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $justgook$elm_image$Image$Info$FromData = function (a) {
	return {$: 3, a: a};
};
var $justgook$elm_image$Image$Info$FromDataBitDepth8 = 3;
var $justgook$elm_image$Image$Info$FromDataChannel4 = function (a) {
	return {$: 3, a: a};
};
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $justgook$elm_image$Image$fromArray = F2(
	function (w, arr) {
		return A2(
			$justgook$elm_image$Image$Internal$ImageData$Array,
			$justgook$elm_image$Image$Info$FromData(
				{
					ab: $justgook$elm_image$Image$Info$FromDataChannel4(3),
					a1: ($elm$core$Array$length(arr) / w) | 0,
					bL: w
				}),
			arr);
	});
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $author$project$Main$featureExtractionImage = function (pixels) {
	return A2(
		$justgook$elm_image$Image$fromArray,
		pixels.aG.bL,
		A2(
			$elm$core$Array$map,
			function (unadjPx) {
				var px = A2(
					$elm$core$Basics$max,
					0,
					A2(
						$elm$core$Basics$min,
						255,
						(unadjPx < 0) ? (255 + unadjPx) : unadjPx));
				return (((px << 24) + (px << 16)) + (px << 8)) + 255;
			},
			pixels.b3));
};
var $elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var $elm$core$Array$indexedMap = F2(
	function (func, _v0) {
		var len = _v0.a;
		var tree = _v0.c;
		var tail = _v0.d;
		var initialBuilder = {
			j: _List_Nil,
			f: 0,
			i: A3(
				$elm$core$Elm$JsArray$indexedMap,
				func,
				$elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (!node.$) {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.f * $elm$core$Array$branchFactor;
					var mappedLeaf = $elm$core$Array$Leaf(
						A3($elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						j: A2($elm$core$List$cons, mappedLeaf, builder.j),
						f: builder.f + 1,
						i: builder.i
					};
				}
			});
		return A2(
			$elm$core$Array$builderToArray,
			true,
			A3($elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			$elm$core$Array$initialize,
			n,
			function (_v0) {
				return e;
			});
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$bytes$Bytes$Encode$getWidth = function (builder) {
	switch (builder.$) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 4;
		case 3:
			return 1;
		case 4:
			return 2;
		case 5:
			return 4;
		case 6:
			return 4;
		case 7:
			return 8;
		case 8:
			var w = builder.a;
			return w;
		case 9:
			var w = builder.a;
			return w;
		default:
			var bs = builder.a;
			return _Bytes_width(bs);
	}
};
var $elm$bytes$Bytes$LE = 0;
var $elm$bytes$Bytes$Encode$write = F3(
	function (builder, mb, offset) {
		switch (builder.$) {
			case 0:
				var n = builder.a;
				return A3(_Bytes_write_i8, mb, offset, n);
			case 1:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_i16, mb, offset, n, !e);
			case 2:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_i32, mb, offset, n, !e);
			case 3:
				var n = builder.a;
				return A3(_Bytes_write_u8, mb, offset, n);
			case 4:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_u16, mb, offset, n, !e);
			case 5:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_u32, mb, offset, n, !e);
			case 6:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_f32, mb, offset, n, !e);
			case 7:
				var e = builder.a;
				var n = builder.b;
				return A4(_Bytes_write_f64, mb, offset, n, !e);
			case 8:
				var bs = builder.b;
				return A3($elm$bytes$Bytes$Encode$writeSequence, bs, mb, offset);
			case 9:
				var s = builder.b;
				return A3(_Bytes_write_string, mb, offset, s);
			default:
				var bs = builder.a;
				return A3(_Bytes_write_bytes, mb, offset, bs);
		}
	});
var $elm$bytes$Bytes$Encode$writeSequence = F3(
	function (builders, mb, offset) {
		writeSequence:
		while (true) {
			if (!builders.b) {
				return offset;
			} else {
				var b = builders.a;
				var bs = builders.b;
				var $temp$builders = bs,
					$temp$mb = mb,
					$temp$offset = A3($elm$bytes$Bytes$Encode$write, b, mb, offset);
				builders = $temp$builders;
				mb = $temp$mb;
				offset = $temp$offset;
				continue writeSequence;
			}
		}
	});
var $elm$bytes$Bytes$Decode$decode = F2(
	function (_v0, bs) {
		var decoder = _v0;
		return A2(_Bytes_decode, decoder, bs);
	});
var $elm$bytes$Bytes$Decode$Decoder = $elm$core$Basics$identity;
var $elm$bytes$Bytes$Decode$loopHelp = F4(
	function (state, callback, bites, offset) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var decoder = _v0;
			var _v1 = A2(decoder, bites, offset);
			var newOffset = _v1.a;
			var step = _v1.b;
			if (!step.$) {
				var newState = step.a;
				var $temp$state = newState,
					$temp$callback = callback,
					$temp$bites = bites,
					$temp$offset = newOffset;
				state = $temp$state;
				callback = $temp$callback;
				bites = $temp$bites;
				offset = $temp$offset;
				continue loopHelp;
			} else {
				var result = step.a;
				return _Utils_Tuple2(newOffset, result);
			}
		}
	});
var $elm$bytes$Bytes$Decode$loop = F2(
	function (state, callback) {
		return A2($elm$bytes$Bytes$Decode$loopHelp, state, callback);
	});
var $elm$bytes$Bytes$Decode$Done = function (a) {
	return {$: 1, a: a};
};
var $elm$bytes$Bytes$Decode$Loop = function (a) {
	return {$: 0, a: a};
};
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $danfishgold$base64_bytes$Decode$lowest6BitsMask = 63;
var $elm$core$Char$fromCode = _Char_fromCode;
var $danfishgold$base64_bytes$Decode$unsafeToChar = function (n) {
	if (n <= 25) {
		return $elm$core$Char$fromCode(65 + n);
	} else {
		if (n <= 51) {
			return $elm$core$Char$fromCode(97 + (n - 26));
		} else {
			if (n <= 61) {
				return $elm$core$Char$fromCode(48 + (n - 52));
			} else {
				switch (n) {
					case 62:
						return '+';
					case 63:
						return '/';
					default:
						return '\u0000';
				}
			}
		}
	}
};
var $danfishgold$base64_bytes$Decode$bitsToChars = F2(
	function (bits, missing) {
		var s = $danfishgold$base64_bytes$Decode$unsafeToChar(bits & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var r = $danfishgold$base64_bytes$Decode$unsafeToChar((bits >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var q = $danfishgold$base64_bytes$Decode$unsafeToChar((bits >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var p = $danfishgold$base64_bytes$Decode$unsafeToChar(bits >>> 18);
		switch (missing) {
			case 0:
				return A2(
					$elm$core$String$cons,
					p,
					A2(
						$elm$core$String$cons,
						q,
						A2(
							$elm$core$String$cons,
							r,
							$elm$core$String$fromChar(s))));
			case 1:
				return A2(
					$elm$core$String$cons,
					p,
					A2(
						$elm$core$String$cons,
						q,
						A2($elm$core$String$cons, r, '=')));
			case 2:
				return A2(
					$elm$core$String$cons,
					p,
					A2($elm$core$String$cons, q, '=='));
			default:
				return '';
		}
	});
var $danfishgold$base64_bytes$Decode$bitsToCharSpecialized = F4(
	function (bits1, bits2, bits3, accum) {
		var z = $danfishgold$base64_bytes$Decode$unsafeToChar((bits3 >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var y = $danfishgold$base64_bytes$Decode$unsafeToChar((bits3 >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var x = $danfishgold$base64_bytes$Decode$unsafeToChar(bits3 >>> 18);
		var w = $danfishgold$base64_bytes$Decode$unsafeToChar(bits3 & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var s = $danfishgold$base64_bytes$Decode$unsafeToChar(bits1 & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var r = $danfishgold$base64_bytes$Decode$unsafeToChar((bits1 >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var q = $danfishgold$base64_bytes$Decode$unsafeToChar((bits1 >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var p = $danfishgold$base64_bytes$Decode$unsafeToChar(bits1 >>> 18);
		var d = $danfishgold$base64_bytes$Decode$unsafeToChar(bits2 & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var c = $danfishgold$base64_bytes$Decode$unsafeToChar((bits2 >>> 6) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var b = $danfishgold$base64_bytes$Decode$unsafeToChar((bits2 >>> 12) & $danfishgold$base64_bytes$Decode$lowest6BitsMask);
		var a = $danfishgold$base64_bytes$Decode$unsafeToChar(bits2 >>> 18);
		return A2(
			$elm$core$String$cons,
			x,
			A2(
				$elm$core$String$cons,
				y,
				A2(
					$elm$core$String$cons,
					z,
					A2(
						$elm$core$String$cons,
						w,
						A2(
							$elm$core$String$cons,
							a,
							A2(
								$elm$core$String$cons,
								b,
								A2(
									$elm$core$String$cons,
									c,
									A2(
										$elm$core$String$cons,
										d,
										A2(
											$elm$core$String$cons,
											p,
											A2(
												$elm$core$String$cons,
												q,
												A2(
													$elm$core$String$cons,
													r,
													A2($elm$core$String$cons, s, accum))))))))))));
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $danfishgold$base64_bytes$Decode$decode18Help = F5(
	function (a, b, c, d, e) {
		var combined6 = ((255 & d) << 16) | e;
		var combined5 = d >>> 8;
		var combined4 = 16777215 & c;
		var combined3 = ((65535 & b) << 8) | (c >>> 24);
		var combined2 = ((255 & a) << 16) | (b >>> 16);
		var combined1 = a >>> 8;
		return A4(
			$danfishgold$base64_bytes$Decode$bitsToCharSpecialized,
			combined3,
			combined2,
			combined1,
			A4($danfishgold$base64_bytes$Decode$bitsToCharSpecialized, combined6, combined5, combined4, ''));
	});
var $elm$bytes$Bytes$Decode$map5 = F6(
	function (func, _v0, _v1, _v2, _v3, _v4) {
		var decodeA = _v0;
		var decodeB = _v1;
		var decodeC = _v2;
		var decodeD = _v3;
		var decodeE = _v4;
		return F2(
			function (bites, offset) {
				var _v5 = A2(decodeA, bites, offset);
				var aOffset = _v5.a;
				var a = _v5.b;
				var _v6 = A2(decodeB, bites, aOffset);
				var bOffset = _v6.a;
				var b = _v6.b;
				var _v7 = A2(decodeC, bites, bOffset);
				var cOffset = _v7.a;
				var c = _v7.b;
				var _v8 = A2(decodeD, bites, cOffset);
				var dOffset = _v8.a;
				var d = _v8.b;
				var _v9 = A2(decodeE, bites, dOffset);
				var eOffset = _v9.a;
				var e = _v9.b;
				return _Utils_Tuple2(
					eOffset,
					A5(func, a, b, c, d, e));
			});
	});
var $elm$bytes$Bytes$BE = 1;
var $elm$bytes$Bytes$Decode$unsignedInt16 = function (endianness) {
	return _Bytes_read_u16(!endianness);
};
var $danfishgold$base64_bytes$Decode$u16BE = $elm$bytes$Bytes$Decode$unsignedInt16(1);
var $elm$bytes$Bytes$Decode$unsignedInt32 = function (endianness) {
	return _Bytes_read_u32(!endianness);
};
var $danfishgold$base64_bytes$Decode$u32BE = $elm$bytes$Bytes$Decode$unsignedInt32(1);
var $danfishgold$base64_bytes$Decode$decode18Bytes = A6($elm$bytes$Bytes$Decode$map5, $danfishgold$base64_bytes$Decode$decode18Help, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u32BE, $danfishgold$base64_bytes$Decode$u16BE);
var $elm$bytes$Bytes$Decode$map = F2(
	function (func, _v0) {
		var decodeA = _v0;
		return F2(
			function (bites, offset) {
				var _v1 = A2(decodeA, bites, offset);
				var aOffset = _v1.a;
				var a = _v1.b;
				return _Utils_Tuple2(
					aOffset,
					func(a));
			});
	});
var $elm$bytes$Bytes$Decode$map2 = F3(
	function (func, _v0, _v1) {
		var decodeA = _v0;
		var decodeB = _v1;
		return F2(
			function (bites, offset) {
				var _v2 = A2(decodeA, bites, offset);
				var aOffset = _v2.a;
				var a = _v2.b;
				var _v3 = A2(decodeB, bites, aOffset);
				var bOffset = _v3.a;
				var b = _v3.b;
				return _Utils_Tuple2(
					bOffset,
					A2(func, a, b));
			});
	});
var $elm$bytes$Bytes$Decode$map3 = F4(
	function (func, _v0, _v1, _v2) {
		var decodeA = _v0;
		var decodeB = _v1;
		var decodeC = _v2;
		return F2(
			function (bites, offset) {
				var _v3 = A2(decodeA, bites, offset);
				var aOffset = _v3.a;
				var a = _v3.b;
				var _v4 = A2(decodeB, bites, aOffset);
				var bOffset = _v4.a;
				var b = _v4.b;
				var _v5 = A2(decodeC, bites, bOffset);
				var cOffset = _v5.a;
				var c = _v5.b;
				return _Utils_Tuple2(
					cOffset,
					A3(func, a, b, c));
			});
	});
var $elm$bytes$Bytes$Decode$succeed = function (a) {
	return F2(
		function (_v0, offset) {
			return _Utils_Tuple2(offset, a);
		});
};
var $elm$bytes$Bytes$Decode$unsignedInt8 = _Bytes_read_u8;
var $danfishgold$base64_bytes$Decode$loopHelp = function (_v0) {
	var remaining = _v0.al;
	var string = _v0.am;
	if (remaining >= 18) {
		return A2(
			$elm$bytes$Bytes$Decode$map,
			function (result) {
				return $elm$bytes$Bytes$Decode$Loop(
					{
						al: remaining - 18,
						am: _Utils_ap(string, result)
					});
			},
			$danfishgold$base64_bytes$Decode$decode18Bytes);
	} else {
		if (remaining >= 3) {
			var helper = F3(
				function (a, b, c) {
					var combined = ((a << 16) | (b << 8)) | c;
					return $elm$bytes$Bytes$Decode$Loop(
						{
							al: remaining - 3,
							am: _Utils_ap(
								string,
								A2($danfishgold$base64_bytes$Decode$bitsToChars, combined, 0))
						});
				});
			return A4($elm$bytes$Bytes$Decode$map3, helper, $elm$bytes$Bytes$Decode$unsignedInt8, $elm$bytes$Bytes$Decode$unsignedInt8, $elm$bytes$Bytes$Decode$unsignedInt8);
		} else {
			if (!remaining) {
				return $elm$bytes$Bytes$Decode$succeed(
					$elm$bytes$Bytes$Decode$Done(string));
			} else {
				if (remaining === 2) {
					var helper = F2(
						function (a, b) {
							var combined = (a << 16) | (b << 8);
							return $elm$bytes$Bytes$Decode$Done(
								_Utils_ap(
									string,
									A2($danfishgold$base64_bytes$Decode$bitsToChars, combined, 1)));
						});
					return A3($elm$bytes$Bytes$Decode$map2, helper, $elm$bytes$Bytes$Decode$unsignedInt8, $elm$bytes$Bytes$Decode$unsignedInt8);
				} else {
					return A2(
						$elm$bytes$Bytes$Decode$map,
						function (a) {
							return $elm$bytes$Bytes$Decode$Done(
								_Utils_ap(
									string,
									A2($danfishgold$base64_bytes$Decode$bitsToChars, a << 16, 2)));
						},
						$elm$bytes$Bytes$Decode$unsignedInt8);
				}
			}
		}
	}
};
var $danfishgold$base64_bytes$Decode$decoder = function (width) {
	return A2(
		$elm$bytes$Bytes$Decode$loop,
		{al: width, am: ''},
		$danfishgold$base64_bytes$Decode$loopHelp);
};
var $elm$bytes$Bytes$width = _Bytes_width;
var $danfishgold$base64_bytes$Decode$fromBytes = function (bytes) {
	return A2(
		$elm$bytes$Bytes$Decode$decode,
		$danfishgold$base64_bytes$Decode$decoder(
			$elm$bytes$Bytes$width(bytes)),
		bytes);
};
var $danfishgold$base64_bytes$Base64$fromBytes = $danfishgold$base64_bytes$Decode$fromBytes;
var $justgook$elm_image$Image$Internal$ImageData$RGBA = 0;
var $justgook$elm_image$Image$Internal$ImageData$RightDown = 0;
var $justgook$elm_image$Image$Internal$ImageData$defaultOptions = {a$: 0, bl: 0};
var $elm$bytes$Bytes$Encode$encode = _Bytes_encode;
var $elm$bytes$Bytes$Encode$Bytes = function (a) {
	return {$: 10, a: a};
};
var $elm$bytes$Bytes$Encode$bytes = $elm$bytes$Bytes$Encode$Bytes;
var $folkertdev$elm_flate$Checksum$Crc32$tinf_crc32case = function (i) {
	switch (i) {
		case 0:
			return 0;
		case 1:
			return 498536548;
		case 2:
			return 997073096;
		case 3:
			return 651767980;
		case 4:
			return 1994146192;
		case 5:
			return 1802195444;
		case 6:
			return 1303535960;
		case 7:
			return 1342533948;
		case 8:
			return 3988292384;
		case 9:
			return 4027552580;
		case 10:
			return 3604390888;
		case 11:
			return 3412177804;
		case 12:
			return 2607071920;
		case 13:
			return 2262029012;
		case 14:
			return 2685067896;
		default:
			return 3183342108;
	}
};
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $folkertdev$elm_flate$Checksum$Crc32$step = F2(
	function (_byte, crc) {
		var a = (crc ^ _byte) >>> 0;
		var b = ((a >>> 4) ^ $folkertdev$elm_flate$Checksum$Crc32$tinf_crc32case(a & 15)) >>> 0;
		var c = (b >>> 4) ^ $folkertdev$elm_flate$Checksum$Crc32$tinf_crc32case(b & 15);
		return c;
	});
var $folkertdev$elm_flate$Checksum$Crc32$crc32Help = function (_v0) {
	var remaining = _v0.al;
	var crc = _v0.ac;
	return (remaining >= 8) ? A3(
		$elm$bytes$Bytes$Decode$map2,
		F2(
			function (word1, word2) {
				var byte8 = 255 & word2;
				var byte7 = 255 & (word2 >>> 8);
				var byte6 = 255 & (word2 >>> 16);
				var byte5 = 255 & (word2 >>> 24);
				var byte4 = 255 & word1;
				var byte3 = 255 & (word1 >>> 8);
				var byte2 = 255 & (word1 >>> 16);
				var byte1 = 255 & (word1 >>> 24);
				return $elm$bytes$Bytes$Decode$Loop(
					{
						ac: A2(
							$folkertdev$elm_flate$Checksum$Crc32$step,
							byte8,
							A2(
								$folkertdev$elm_flate$Checksum$Crc32$step,
								byte7,
								A2(
									$folkertdev$elm_flate$Checksum$Crc32$step,
									byte6,
									A2(
										$folkertdev$elm_flate$Checksum$Crc32$step,
										byte5,
										A2(
											$folkertdev$elm_flate$Checksum$Crc32$step,
											byte4,
											A2(
												$folkertdev$elm_flate$Checksum$Crc32$step,
												byte3,
												A2(
													$folkertdev$elm_flate$Checksum$Crc32$step,
													byte2,
													A2($folkertdev$elm_flate$Checksum$Crc32$step, byte1, crc)))))))),
						al: remaining - 8
					});
			}),
		$elm$bytes$Bytes$Decode$unsignedInt32(1),
		$elm$bytes$Bytes$Decode$unsignedInt32(1)) : ((remaining > 0) ? A2(
		$elm$bytes$Bytes$Decode$map,
		function (_byte) {
			return $elm$bytes$Bytes$Decode$Loop(
				{
					ac: A2($folkertdev$elm_flate$Checksum$Crc32$step, _byte, crc),
					al: remaining - 1
				});
		},
		$elm$bytes$Bytes$Decode$unsignedInt8) : $elm$bytes$Bytes$Decode$succeed(
		$elm$bytes$Bytes$Decode$Done((crc ^ 4294967295) >>> 0)));
};
var $folkertdev$elm_flate$Checksum$Crc32$tinf_crc32 = function (buffer) {
	var length = $elm$bytes$Bytes$width(buffer);
	var initialCrc = 4294967295;
	return (!length) ? 0 : A2(
		$elm$core$Maybe$withDefault,
		0,
		A2(
			$elm$bytes$Bytes$Decode$decode,
			A2(
				$elm$bytes$Bytes$Decode$loop,
				{ac: initialCrc, al: length},
				$folkertdev$elm_flate$Checksum$Crc32$crc32Help),
			buffer));
};
var $folkertdev$elm_flate$Checksum$Crc32$crc32 = $folkertdev$elm_flate$Checksum$Crc32$tinf_crc32;
var $folkertdev$elm_flate$Flate$crc32 = $folkertdev$elm_flate$Checksum$Crc32$crc32;
var $elm$bytes$Bytes$Encode$Seq = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$getWidths = F2(
	function (width, builders) {
		getWidths:
		while (true) {
			if (!builders.b) {
				return width;
			} else {
				var b = builders.a;
				var bs = builders.b;
				var $temp$width = width + $elm$bytes$Bytes$Encode$getWidth(b),
					$temp$builders = bs;
				width = $temp$width;
				builders = $temp$builders;
				continue getWidths;
			}
		}
	});
var $elm$bytes$Bytes$Encode$sequence = function (builders) {
	return A2(
		$elm$bytes$Bytes$Encode$Seq,
		A2($elm$bytes$Bytes$Encode$getWidths, 0, builders),
		builders);
};
var $elm$bytes$Bytes$Encode$U32 = F2(
	function (a, b) {
		return {$: 5, a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$unsignedInt32 = $elm$bytes$Bytes$Encode$U32;
var $justgook$elm_image$Image$Internal$PNG$encodeChunk = F2(
	function (kind, data) {
		var length = $elm$bytes$Bytes$width(data);
		var kindAndData = $elm$bytes$Bytes$Encode$encode(
			$elm$bytes$Bytes$Encode$sequence(
				_List_fromArray(
					[
						A2($elm$bytes$Bytes$Encode$unsignedInt32, 1, kind),
						$elm$bytes$Bytes$Encode$bytes(data)
					])));
		return $elm$bytes$Bytes$Encode$sequence(
			_List_fromArray(
				[
					A2($elm$bytes$Bytes$Encode$unsignedInt32, 1, length),
					$elm$bytes$Bytes$Encode$bytes(kindAndData),
					A2(
					$elm$bytes$Bytes$Encode$unsignedInt32,
					1,
					$folkertdev$elm_flate$Flate$crc32(kindAndData))
				]));
	});
var $folkertdev$elm_flate$Flate$Dynamic = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$elm_flate$Flate$WithWindowSize = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$elm_flate$Checksum$Adler32$a32 = {ao: 65521, bg: 5552};
var $folkertdev$elm_flate$Checksum$Adler32$step8Bytes = F5(
	function (remaining, s1, s2, word1, word2) {
		var byte8 = 255 & word2;
		var byte7 = 255 & (word2 >>> 8);
		var byte6 = 255 & (word2 >>> 16);
		var byte5 = 255 & (word2 >>> 24);
		var byte4 = 255 & word1;
		var byte3 = 255 & (word1 >>> 8);
		var byte2 = 255 & (word1 >>> 16);
		var byte1 = 255 & (word1 >>> 24);
		var s1a_1 = s1 + byte1;
		var s1a_2 = s1a_1 + byte2;
		var s1a_3 = s1a_2 + byte3;
		var s1a_4 = s1a_3 + byte4;
		var s2a_1 = s2 + s1a_1;
		var s2a_2 = s2a_1 + s1a_2;
		var s2a_3 = s2a_2 + s1a_3;
		var s2a_4 = s2a_3 + s1a_4;
		var s1b_1 = s1a_4 + byte5;
		var s1b_2 = s1b_1 + byte6;
		var s1b_3 = s1b_2 + byte7;
		var s1b_4 = s1b_3 + byte8;
		var s2b_1 = s2a_4 + s1b_1;
		var s2b_2 = s2b_1 + s1b_2;
		var s2b_3 = s2b_2 + s1b_3;
		var s2b_4 = s2b_3 + s1b_4;
		return $elm$bytes$Bytes$Decode$Loop(
			{al: remaining - 8, r: s1b_4, s: s2b_4});
	});
var $folkertdev$elm_flate$Checksum$Adler32$processChunkHelp = function (_v0) {
	var remaining = _v0.al;
	var s1 = _v0.r;
	var s2 = _v0.s;
	return (remaining >= 8) ? A3(
		$elm$bytes$Bytes$Decode$map2,
		A3($folkertdev$elm_flate$Checksum$Adler32$step8Bytes, remaining, s1, s2),
		$elm$bytes$Bytes$Decode$unsignedInt32(1),
		$elm$bytes$Bytes$Decode$unsignedInt32(1)) : ((remaining > 0) ? A2(
		$elm$bytes$Bytes$Decode$map,
		function (_byte) {
			return $elm$bytes$Bytes$Decode$Loop(
				{al: remaining - 1, r: s1 + _byte, s: (s1 + _byte) + s2});
		},
		$elm$bytes$Bytes$Decode$unsignedInt8) : $elm$bytes$Bytes$Decode$succeed(
		$elm$bytes$Bytes$Decode$Done(
			{r: s1 % $folkertdev$elm_flate$Checksum$Adler32$a32.ao, s: s2 % $folkertdev$elm_flate$Checksum$Adler32$a32.ao})));
};
var $folkertdev$elm_flate$Checksum$Adler32$processChunk = function (config) {
	return A2($elm$bytes$Bytes$Decode$loop, config, $folkertdev$elm_flate$Checksum$Adler32$processChunkHelp);
};
var $folkertdev$elm_flate$Checksum$Adler32$chunkedFold = function (_v0) {
	var bufferSize = _v0.aN;
	var maxBlockSize = _v0.bc;
	var go = function (_v1) {
		var remainingLength = _v1.aE;
		var s1 = _v1.r;
		var s2 = _v1.s;
		return (!remainingLength) ? $elm$bytes$Bytes$Decode$succeed(
			$elm$bytes$Bytes$Decode$Done(
				{r: s1, s: s2})) : ((_Utils_cmp(remainingLength, maxBlockSize) < 0) ? A2(
			$elm$bytes$Bytes$Decode$map,
			$elm$bytes$Bytes$Decode$Done,
			$folkertdev$elm_flate$Checksum$Adler32$processChunk(
				{al: remainingLength, r: s1, s: s2})) : A2(
			$elm$bytes$Bytes$Decode$map,
			function (result) {
				return $elm$bytes$Bytes$Decode$Loop(
					{aE: remainingLength - maxBlockSize, r: result.r, s: result.s});
			},
			$folkertdev$elm_flate$Checksum$Adler32$processChunk(
				{al: maxBlockSize, r: s1, s: s2})));
	};
	return A2(
		$elm$bytes$Bytes$Decode$loop,
		{aE: bufferSize, r: 1, s: 0},
		go);
};
var $folkertdev$elm_flate$Checksum$Adler32$adler32 = function (buffer) {
	var _v0 = A2(
		$elm$bytes$Bytes$Decode$decode,
		$folkertdev$elm_flate$Checksum$Adler32$chunkedFold(
			{
				aN: $elm$bytes$Bytes$width(buffer),
				bc: $folkertdev$elm_flate$Checksum$Adler32$a32.bg
			}),
		buffer);
	if (_v0.$ === 1) {
		return 0;
	} else {
		var s1 = _v0.a.r;
		var s2 = _v0.a.s;
		return ((s2 << 16) | s1) >>> 0;
	}
};
var $elm$bytes$Bytes$Decode$bytes = function (n) {
	return _Bytes_read_bytes(n);
};
var $folkertdev$elm_flate$Deflate$Internal$chunksHelp = F2(
	function (chunkSize, _v0) {
		var sizeRemaining = _v0.a;
		var accum = _v0.b;
		return (!sizeRemaining) ? $elm$bytes$Bytes$Decode$succeed(
			$elm$bytes$Bytes$Decode$Done(_List_Nil)) : ((_Utils_cmp(chunkSize, sizeRemaining) > -1) ? A2(
			$elm$bytes$Bytes$Decode$map,
			function (_new) {
				return $elm$bytes$Bytes$Decode$Done(
					$elm$core$List$reverse(
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(true, _new),
							accum)));
			},
			$elm$bytes$Bytes$Decode$bytes(sizeRemaining)) : A2(
			$elm$bytes$Bytes$Decode$map,
			function (_new) {
				return $elm$bytes$Bytes$Decode$Loop(
					_Utils_Tuple2(
						sizeRemaining - chunkSize,
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(false, _new),
							accum)));
			},
			$elm$bytes$Bytes$Decode$bytes(chunkSize)));
	});
var $folkertdev$elm_flate$Deflate$Internal$chunks = F2(
	function (chunkSize, buffer) {
		var _v0 = A2(
			$elm$bytes$Bytes$Decode$decode,
			A2(
				$elm$bytes$Bytes$Decode$loop,
				_Utils_Tuple2(
					$elm$bytes$Bytes$width(buffer),
					_List_Nil),
				$folkertdev$elm_flate$Deflate$Internal$chunksHelp(chunkSize)),
			buffer);
		if (_v0.$ === 1) {
			return _List_fromArray(
				[
					_Utils_Tuple2(
					true,
					$elm$bytes$Bytes$Encode$encode(
						$elm$bytes$Bytes$Encode$sequence(_List_Nil)))
				]);
		} else {
			if (!_v0.a.b) {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						true,
						$elm$bytes$Bytes$Encode$encode(
							$elm$bytes$Bytes$Encode$sequence(_List_Nil)))
					]);
			} else {
				var value = _v0.a;
				return value;
			}
		}
	});
var $folkertdev$elm_flate$Deflate$Internal$default_block_size = 1024 * 1024;
var $folkertdev$elm_flate$Deflate$BitWriter$empty = {u: 0, v: _List_Nil, A: 0};
var $folkertdev$elm_flate$Deflate$Symbol$code = function (symbol) {
	switch (symbol.$) {
		case 1:
			var _byte = symbol.a;
			return _byte;
		case 0:
			return 256;
		default:
			var length = symbol.a;
			return ((length >= 3) && (length <= 10)) ? ((257 + length) - 3) : (((length >= 11) && (length <= 18)) ? (265 + (((length - 11) / 2) | 0)) : (((length >= 19) && (length <= 34)) ? (269 + (((length - 19) / 4) | 0)) : (((length >= 35) && (length <= 66)) ? (273 + (((length - 35) / 8) | 0)) : (((length >= 67) && (length <= 130)) ? (277 + (((length - 67) / 16) | 0)) : (((length >= 131) && (length <= 257)) ? (281 + (((length - 131) / 32) | 0)) : ((length === 258) ? 285 : (-1)))))));
	}
};
var $folkertdev$elm_flate$Deflate$Symbol$distance = function (symbol) {
	if (symbol.$ === 2) {
		var distance_ = symbol.b;
		if (distance_ <= 4) {
			return $elm$core$Maybe$Just(
				_Utils_Tuple3(distance_ - 1, 0, 0));
		} else {
			var go = F3(
				function (extraBits, code_, base) {
					go:
					while (true) {
						if (_Utils_cmp(base * 2, distance_) < 0) {
							var $temp$extraBits = extraBits + 1,
								$temp$code_ = code_ + 2,
								$temp$base = base * 2;
							extraBits = $temp$extraBits;
							code_ = $temp$code_;
							base = $temp$base;
							continue go;
						} else {
							return _Utils_Tuple3(extraBits, code_, base);
						}
					}
				});
			var _v1 = A3(go, 1, 4, 4);
			var extraBits = _v1.a;
			var code_ = _v1.b;
			var base = _v1.c;
			var delta = (distance_ - base) - 1;
			var half = (base / 2) | 0;
			return (_Utils_cmp(distance_, base + half) < 1) ? $elm$core$Maybe$Just(
				_Utils_Tuple3(
					code_,
					extraBits,
					A2($elm$core$Basics$modBy, half, delta))) : $elm$core$Maybe$Just(
				_Utils_Tuple3(
					code_ + 1,
					extraBits,
					A2($elm$core$Basics$modBy, half, delta)));
		}
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $folkertdev$elm_flate$Deflate$Symbol$update = F3(
	function (index, tagger, array) {
		var _v0 = A2($elm$core$Array$get, index, array);
		if (_v0.$ === 1) {
			return array;
		} else {
			var value = _v0.a;
			return A3(
				$elm$core$Array$set,
				index,
				tagger(value),
				array);
		}
	});
var $folkertdev$elm_flate$Deflate$Symbol$dynamicFindFrequencies = F2(
	function (symbol, _v0) {
		var literalCounts = _v0.a;
		var distanceCounts = _v0.b;
		var emptyDistanceCount = _v0.c;
		var _v1 = $folkertdev$elm_flate$Deflate$Symbol$distance(symbol);
		if (_v1.$ === 1) {
			return _Utils_Tuple3(
				A3(
					$folkertdev$elm_flate$Deflate$Symbol$update,
					$folkertdev$elm_flate$Deflate$Symbol$code(symbol),
					function (v) {
						return v + 1;
					},
					literalCounts),
				distanceCounts,
				emptyDistanceCount);
		} else {
			var _v2 = _v1.a;
			var d = _v2.a;
			return _Utils_Tuple3(
				A3(
					$folkertdev$elm_flate$Deflate$Symbol$update,
					$folkertdev$elm_flate$Deflate$Symbol$code(symbol),
					function (v) {
						return v + 1;
					},
					literalCounts),
				A3(
					$folkertdev$elm_flate$Deflate$Symbol$update,
					d,
					function (v) {
						return v + 1;
					},
					distanceCounts),
				false);
		}
	});
var $elm$core$List$sortWith = _List_sortWith;
var $folkertdev$elm_flate$Huffman$calcOptimalMaxBitWidth = function (frequencies) {
	var heapModificationLoop = function (heap) {
		heapModificationLoop:
		while (true) {
			if (!heap.b) {
				return 0;
			} else {
				if (!heap.b.b) {
					var _v1 = heap.a;
					var value = _v1.b;
					return A2($elm$core$Basics$max, 1, value);
				} else {
					var _v2 = heap.a;
					var weight1 = _v2.a;
					var width1 = _v2.b;
					var _v3 = heap.b;
					var _v4 = _v3.a;
					var weight2 = _v4.a;
					var width2 = _v4.b;
					var rest = _v3.b;
					var $temp$heap = A2(
						$elm$core$List$sortWith,
						F2(
							function (a, b) {
								return A2($elm$core$Basics$compare, b, a);
							}),
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(
								weight1 + weight2,
								1 + A2($elm$core$Basics$max, width1, width2)),
							rest));
					heap = $temp$heap;
					continue heapModificationLoop;
				}
			}
		}
	};
	var createHeapFolder = F2(
		function (freq, heap) {
			return (freq > 0) ? A2(
				$elm$core$List$cons,
				_Utils_Tuple2(-freq, 0),
				heap) : heap;
		});
	var createHeap = A3($elm$core$Array$foldl, createHeapFolder, _List_Nil, frequencies);
	return heapModificationLoop(createHeap);
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Array$filter = F2(
	function (isGood, array) {
		return $elm$core$Array$fromList(
			A3(
				$elm$core$Array$foldr,
				F2(
					function (x, xs) {
						return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
					}),
				_List_Nil,
				array));
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$mergeLoop = F3(
	function (xarr, yarr, accum) {
		mergeLoop:
		while (true) {
			var _v0 = _Utils_Tuple2(xarr, yarr);
			if (!_v0.a.b) {
				return A2(
					$elm$core$Array$append,
					accum,
					$elm$core$Array$fromList(yarr));
			} else {
				if (!_v0.b.b) {
					return A2(
						$elm$core$Array$append,
						accum,
						$elm$core$Array$fromList(xarr));
				} else {
					var _v1 = _v0.a;
					var x = _v1.a;
					var xrest = _v1.b;
					var _v2 = _v0.b;
					var y = _v2.a;
					var yrest = _v2.b;
					if (_Utils_cmp(x.y, y.y) < 0) {
						var $temp$xarr = xrest,
							$temp$yarr = yarr,
							$temp$accum = A2($elm$core$Array$push, x, accum);
						xarr = $temp$xarr;
						yarr = $temp$yarr;
						accum = $temp$accum;
						continue mergeLoop;
					} else {
						var $temp$xarr = xarr,
							$temp$yarr = yrest,
							$temp$accum = A2($elm$core$Array$push, y, accum);
						xarr = $temp$xarr;
						yarr = $temp$yarr;
						accum = $temp$accum;
						continue mergeLoop;
					}
				}
			}
		}
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$merge = F2(
	function (x, y) {
		return A3(
			$folkertdev$elm_flate$LengthLimitedHuffmanCodes$mergeLoop,
			$elm$core$Array$toList(x),
			$elm$core$Array$toList(y),
			$elm$core$Array$empty);
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$mergeNodes = F2(
	function (node1, node2) {
		return {
			L: A2($elm$core$Array$append, node1.L, node2.L),
			y: node1.y + node2.y
		};
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$package = function (nodes) {
	if ($elm$core$Array$length(nodes) >= 2) {
		var newLen = ($elm$core$Array$length(nodes) / 2) | 0;
		var loop = F2(
			function (currentNodes, accum) {
				loop:
				while (true) {
					if (currentNodes.b && currentNodes.b.b) {
						var self = currentNodes.a;
						var _v1 = currentNodes.b;
						var other = _v1.a;
						var rest = _v1.b;
						var $temp$currentNodes = rest,
							$temp$accum = A2(
							$elm$core$List$cons,
							A2($folkertdev$elm_flate$LengthLimitedHuffmanCodes$mergeNodes, self, other),
							accum);
						currentNodes = $temp$currentNodes;
						accum = $temp$accum;
						continue loop;
					} else {
						return $elm$core$Array$fromList(
							$elm$core$List$reverse(accum));
					}
				}
			});
		return A2(
			loop,
			$elm$core$Array$toList(nodes),
			_List_Nil);
	} else {
		return nodes;
	}
};
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$singletonNode = F2(
	function (symbol, weight) {
		return {
			L: A2($elm$core$Array$repeat, 1, symbol),
			y: weight
		};
	});
var $elm_community$list_extra$List$Extra$stableSortWith = F2(
	function (pred, list) {
		var predWithIndex = F2(
			function (_v1, _v2) {
				var a1 = _v1.a;
				var i1 = _v1.b;
				var a2 = _v2.a;
				var i2 = _v2.b;
				var result = A2(pred, a1, a2);
				if (result === 1) {
					return A2($elm$core$Basics$compare, i1, i2);
				} else {
					return result;
				}
			});
		var listWithIndex = A2(
			$elm$core$List$indexedMap,
			F2(
				function (i, a) {
					return _Utils_Tuple2(a, i);
				}),
			list);
		return A2(
			$elm$core$List$map,
			$elm$core$Tuple$first,
			A2($elm$core$List$sortWith, predWithIndex, listWithIndex));
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$update = F3(
	function (index, tagger, array) {
		var _v0 = A2($elm$core$Array$get, index, array);
		if (_v0.$ === 1) {
			return array;
		} else {
			var value = _v0.a;
			return A3(
				$elm$core$Array$set,
				index,
				tagger(value),
				array);
		}
	});
var $folkertdev$elm_flate$LengthLimitedHuffmanCodes$calculate = F2(
	function (maxBitWidth, frequencies) {
		var source = $elm$core$Array$fromList(
			A2(
				$elm_community$list_extra$List$Extra$stableSortWith,
				F2(
					function (a, b) {
						return A2($elm$core$Basics$compare, a.y, b.y);
					}),
				$elm$core$Array$toList(
					A2(
						$elm$core$Array$map,
						function (_v3) {
							var symbol = _v3.a;
							var weight = _v3.b;
							return A2($folkertdev$elm_flate$LengthLimitedHuffmanCodes$singletonNode, symbol, weight);
						},
						A2(
							$elm$core$Array$filter,
							function (_v2) {
								var f = _v2.b;
								return f > 0;
							},
							A2($elm$core$Array$indexedMap, $elm$core$Tuple$pair, frequencies))))));
		var weighted = A3(
			$elm$core$List$foldl,
			F2(
				function (_v1, w) {
					return A2(
						$folkertdev$elm_flate$LengthLimitedHuffmanCodes$merge,
						$folkertdev$elm_flate$LengthLimitedHuffmanCodes$package(w),
						source);
				}),
			source,
			A2($elm$core$List$range, 0, maxBitWidth - 2));
		var loop = F2(
			function (symbols, accum) {
				loop:
				while (true) {
					if (!symbols.b) {
						return accum;
					} else {
						var symbol = symbols.a;
						var rest = symbols.b;
						var $temp$symbols = rest,
							$temp$accum = A3(
							$folkertdev$elm_flate$LengthLimitedHuffmanCodes$update,
							symbol,
							function (v) {
								return v + 1;
							},
							accum);
						symbols = $temp$symbols;
						accum = $temp$accum;
						continue loop;
					}
				}
			});
		var allSymbols = A2(
			$elm$core$List$concatMap,
			A2(
				$elm$core$Basics$composeR,
				function ($) {
					return $.L;
				},
				$elm$core$Array$toList),
			$elm$core$Array$toList(
				$folkertdev$elm_flate$LengthLimitedHuffmanCodes$package(weighted)));
		return A2(
			loop,
			allSymbols,
			A2(
				$elm$core$Array$repeat,
				$elm$core$Array$length(frequencies),
				0));
	});
var $folkertdev$elm_flate$Huffman$Tree = $elm$core$Basics$identity;
var $folkertdev$elm_flate$Huffman$Code = $elm$core$Basics$identity;
var $folkertdev$elm_flate$Huffman$codeFromRecord = $elm$core$Basics$identity;
var $folkertdev$elm_flate$Huffman$new = function (n) {
	return A2(
		$elm$core$Array$repeat,
		n,
		$folkertdev$elm_flate$Huffman$codeFromRecord(
			{a: 0, bL: 0}));
};
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $folkertdev$elm_flate$Huffman$inverseEndianLoop = F4(
	function (i, limit, f, t) {
		inverseEndianLoop:
		while (true) {
			if (_Utils_cmp(i, limit) < 0) {
				var $temp$i = i + 1,
					$temp$limit = limit,
					$temp$f = f >> 1,
					$temp$t = (f & 1) | (t << 1);
				i = $temp$i;
				limit = $temp$limit;
				f = $temp$f;
				t = $temp$t;
				continue inverseEndianLoop;
			} else {
				return t;
			}
		}
	});
var $folkertdev$elm_flate$Huffman$inverseEndian = function (_v0) {
	var width = _v0.bL;
	var bits = _v0.a;
	var inverseBits = A4($folkertdev$elm_flate$Huffman$inverseEndianLoop, 0, width, bits, 0);
	return {a: inverseBits, bL: width};
};
var $folkertdev$elm_flate$Huffman$setMapping = F3(
	function (symbol, code, _v0) {
		var array = _v0;
		return A3(
			$elm$core$Array$set,
			symbol,
			$folkertdev$elm_flate$Huffman$inverseEndian(code),
			array);
	});
var $folkertdev$elm_flate$Huffman$restoreCanonicalHuffmanCodes = F2(
	function (bitWidths, tree) {
		var symbols = A2(
			$elm_community$list_extra$List$Extra$stableSortWith,
			F2(
				function (_v4, _v5) {
					var a = _v4.b;
					var b = _v5.b;
					return A2($elm$core$Basics$compare, a, b);
				}),
			$elm$core$Array$toList(
				A2(
					$elm$core$Array$filter,
					function (_v3) {
						var codeBitWidth = _v3.b;
						return codeBitWidth > 0;
					},
					A2($elm$core$Array$indexedMap, $elm$core$Tuple$pair, bitWidths))));
		var loop = F2(
			function (_v1, _v2) {
				var symbol = _v1.a;
				var bitWidth = _v1.b;
				var code = _v2.a;
				var prevWidth = _v2.b;
				var currentTree = _v2.c;
				var newBits = code << (bitWidth - prevWidth);
				var nextCode = {a: newBits, bL: bitWidth};
				return _Utils_Tuple3(
					newBits + 1,
					bitWidth,
					A3($folkertdev$elm_flate$Huffman$setMapping, symbol, nextCode, currentTree));
			});
		return function (_v0) {
			var x = _v0.c;
			return x;
		}(
			A3(
				$elm$core$List$foldl,
				loop,
				_Utils_Tuple3(0, 0, tree),
				symbols));
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $folkertdev$elm_flate$Huffman$fromBitWidths = function (bitWidths) {
	var symbolCount = function (v) {
		return v + 1;
	}(
		A2(
			$elm$core$Maybe$withDefault,
			0,
			A2(
				$elm$core$Maybe$map,
				$elm$core$Tuple$first,
				function (a) {
					return A2(
						$elm$core$Array$get,
						$elm$core$Array$length(a) - 1,
						a);
				}(
					A2(
						$elm$core$Array$filter,
						function (e) {
							return e.b > 0;
						},
						A2($elm$core$Array$indexedMap, $elm$core$Tuple$pair, bitWidths))))));
	return A2(
		$folkertdev$elm_flate$Huffman$restoreCanonicalHuffmanCodes,
		bitWidths,
		$folkertdev$elm_flate$Huffman$new(symbolCount));
};
var $folkertdev$elm_flate$Huffman$fromFrequencies = F2(
	function (symbolFrequencies, maxBitWidth_) {
		var maxBitWidth = A2(
			$elm$core$Basics$min,
			maxBitWidth_,
			$folkertdev$elm_flate$Huffman$calcOptimalMaxBitWidth(symbolFrequencies));
		var codeBitWidhts = A2($folkertdev$elm_flate$LengthLimitedHuffmanCodes$calculate, maxBitWidth, symbolFrequencies);
		return $folkertdev$elm_flate$Huffman$fromBitWidths(codeBitWidhts);
	});
var $folkertdev$elm_flate$Deflate$Symbol$buildDynamicHuffmanCodec = function (symbols) {
	var _v0 = A3(
		$elm$core$Array$foldl,
		$folkertdev$elm_flate$Deflate$Symbol$dynamicFindFrequencies,
		_Utils_Tuple3(
			A2($elm$core$Array$repeat, 286, 0),
			A2($elm$core$Array$repeat, 30, 0),
			true),
		symbols);
	var literalCounts = _v0.a;
	var distanceCounts = _v0.b;
	var emptyDistanceCount = _v0.c;
	return {
		G: emptyDistanceCount ? A2(
			$folkertdev$elm_flate$Huffman$fromFrequencies,
			A3($elm$core$Array$set, 0, 1, distanceCounts),
			15) : A2($folkertdev$elm_flate$Huffman$fromFrequencies, distanceCounts, 15),
		I: A2($folkertdev$elm_flate$Huffman$fromFrequencies, literalCounts, 15)
	};
};
var $folkertdev$elm_flate$Deflate$Symbol$EndOfBlock = {$: 0};
var $folkertdev$elm_flate$Deflate$Symbol$Literal = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$elm_flate$Deflate$Symbol$Share = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $folkertdev$elm_flate$Deflate$Internal$codeToSymbol = function (code) {
	if (!code.$) {
		var v = code.a;
		return $folkertdev$elm_flate$Deflate$Symbol$Literal(v);
	} else {
		var length = code.a;
		var backwardDistance = code.b;
		return A2($folkertdev$elm_flate$Deflate$Symbol$Share, length, backwardDistance);
	}
};
var $folkertdev$elm_flate$LZ77$Literal = function (a) {
	return {$: 0, a: a};
};
var $folkertdev$elm_flate$LZ77$Pointer = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $folkertdev$elm_flate$PrefixTable$Small = function (a) {
	return {$: 0, a: a};
};
var $folkertdev$elm_flate$PrefixTable$Large = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$elm_flate$PrefixTable$LargePrefixTable = $elm$core$Basics$identity;
var $folkertdev$elm_flate$PrefixTable$insertInList = F6(
	function (i, array, p2, position, remaining, accum) {
		insertInList:
		while (true) {
			if (!remaining.b) {
				var newPositions = A2(
					$elm$core$List$cons,
					_Utils_Tuple2(p2, position),
					accum);
				return _Utils_Tuple2(
					$folkertdev$elm_flate$PrefixTable$Large(
						A3($elm$core$Array$set, i, newPositions, array)),
					$elm$core$Maybe$Nothing);
			} else {
				var current = remaining.a;
				var key = current.a;
				var oldValue = current.b;
				var rest = remaining.b;
				if (!(key - p2)) {
					var newPositions = _Utils_ap(
						accum,
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2(key, position),
							rest));
					return _Utils_Tuple2(
						$folkertdev$elm_flate$PrefixTable$Large(
							A3($elm$core$Array$set, i, newPositions, array)),
						$elm$core$Maybe$Just(oldValue));
				} else {
					var $temp$i = i,
						$temp$array = array,
						$temp$p2 = p2,
						$temp$position = position,
						$temp$remaining = rest,
						$temp$accum = A2($elm$core$List$cons, current, accum);
					i = $temp$i;
					array = $temp$array;
					p2 = $temp$p2;
					position = $temp$position;
					remaining = $temp$remaining;
					accum = $temp$accum;
					continue insertInList;
				}
			}
		}
	});
var $folkertdev$elm_flate$PrefixTable$insert = F3(
	function (_v0, position, ptable) {
		var prefix_ = _v0;
		var prefix = 16777215 & (prefix_ >>> 0);
		if (!ptable.$) {
			var dict = ptable.a;
			var _v2 = A2($elm$core$Dict$get, prefix, dict);
			if (_v2.$ === 1) {
				return _Utils_Tuple2(
					$folkertdev$elm_flate$PrefixTable$Small(
						A3($elm$core$Dict$insert, prefix, position, dict)),
					$elm$core$Maybe$Nothing);
			} else {
				var oldValue = _v2.a;
				return _Utils_Tuple2(
					$folkertdev$elm_flate$PrefixTable$Small(
						A3($elm$core$Dict$insert, prefix, position, dict)),
					$elm$core$Maybe$Just(oldValue));
			}
		} else {
			var array = ptable.a;
			var index = prefix >> 8;
			var _v3 = A2($elm$core$Array$get, index, array);
			if (_v3.$ === 1) {
				return _Utils_Tuple2(ptable, $elm$core$Maybe$Nothing);
			} else {
				var positions = _v3.a;
				return A6($folkertdev$elm_flate$PrefixTable$insertInList, index, array, 255 & prefix, position, positions, _List_Nil);
			}
		}
	});
var $folkertdev$elm_flate$Experimental$ByteArray$length = function (_v0) {
	var array = _v0.a;
	var finalSize = _v0.b;
	var finalBytes = _v0.c;
	var _v1 = $elm$core$Array$length(array) * 4;
	if (!_v1) {
		return finalSize;
	} else {
		var l = _v1;
		return l + finalSize;
	}
};
var $folkertdev$elm_flate$Experimental$ByteArray$get = F2(
	function (index, _v0) {
		var array = _v0.a;
		var finalSize = _v0.b;
		var finalBytes = _v0.c;
		var offset = index % 4;
		if (_Utils_cmp(
			index,
			($elm$core$Array$length(array) * 4) + finalSize) > -1) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (_Utils_cmp(
				index,
				$elm$core$Array$length(array) * 4) > -1) {
				return $elm$core$Maybe$Just(255 & (finalBytes >>> (8 * (3 - offset))));
			} else {
				var internalIndex = (index / 4) | 0;
				var _v1 = A2($elm$core$Array$get, internalIndex, array);
				if (_v1.$ === 1) {
					return $elm$core$Maybe$Nothing;
				} else {
					var int32 = _v1.a;
					return $elm$core$Maybe$Just(255 & (int32 >>> (8 * (3 - offset))));
				}
			}
		}
	});
var $folkertdev$elm_flate$LZ77$longestCommonPrefixLoop = F5(
	function (i, j, limit, accum, array) {
		longestCommonPrefixLoop:
		while (true) {
			if (_Utils_cmp(i, limit) < 0) {
				var _v0 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, i, array);
				if (_v0.$ === 1) {
					return accum;
				} else {
					var value1 = _v0.a;
					var _v1 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, j, array);
					if (_v1.$ === 1) {
						return accum;
					} else {
						var value2 = _v1.a;
						if (!(value1 - value2)) {
							var $temp$i = i + 1,
								$temp$j = j + 1,
								$temp$limit = limit,
								$temp$accum = accum + 1,
								$temp$array = array;
							i = $temp$i;
							j = $temp$j;
							limit = $temp$limit;
							accum = $temp$accum;
							array = $temp$array;
							continue longestCommonPrefixLoop;
						} else {
							return accum;
						}
					}
				}
			} else {
				return accum;
			}
		}
	});
var $folkertdev$elm_flate$LZ77$max_length = 258;
var $folkertdev$elm_flate$LZ77$longestCommonPrefix = F3(
	function (i, j, array) {
		var remaining = A2(
			$elm$core$Basics$min,
			$folkertdev$elm_flate$LZ77$max_length - 3,
			$folkertdev$elm_flate$Experimental$ByteArray$length(array) - j);
		return A5($folkertdev$elm_flate$LZ77$longestCommonPrefixLoop, i, j, i + remaining, 0, array);
	});
var $folkertdev$elm_flate$PrefixTable$OutOfBounds = {$: 3};
var $folkertdev$elm_flate$PrefixTable$Prefix = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $folkertdev$elm_flate$PrefixTable$PrefixCode = $elm$core$Basics$identity;
var $folkertdev$elm_flate$PrefixTable$Trailing1 = function (a) {
	return {$: 1, a: a};
};
var $folkertdev$elm_flate$PrefixTable$Trailing2 = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var $folkertdev$elm_flate$Experimental$ByteArray$getInt32 = F2(
	function (index, _v0) {
		var array = _v0.a;
		var finalBytes = _v0.c;
		var size = $elm$core$Array$length(array);
		return (!(index - size)) ? $elm$core$Maybe$Just(finalBytes) : A2($elm$core$Array$get, index, array);
	});
var $folkertdev$elm_flate$PrefixTable$prefixAt = F2(
	function (k, input) {
		var size = $folkertdev$elm_flate$Experimental$ByteArray$length(input);
		if (_Utils_cmp(k + 2, size) > -1) {
			if (_Utils_cmp(k, size) > -1) {
				return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
			} else {
				if (_Utils_cmp(k + 1, size) > -1) {
					var _v0 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, k, input);
					if (_v0.$ === 1) {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var value = _v0.a;
						return $folkertdev$elm_flate$PrefixTable$Trailing1(value);
					}
				} else {
					var _v1 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, k, input);
					if (_v1.$ === 1) {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var v1 = _v1.a;
						var _v2 = A2($folkertdev$elm_flate$Experimental$ByteArray$get, k + 1, input);
						if (_v2.$ === 1) {
							return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
						} else {
							var v2 = _v2.a;
							return A2($folkertdev$elm_flate$PrefixTable$Trailing2, v1, v2);
						}
					}
				}
			}
		} else {
			var offset = k % 4;
			var internalIndex = (k / 4) | 0;
			switch (offset) {
				case 0:
					var _v4 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex, input);
					if (_v4.$ === 1) {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var int32 = _v4.a;
						var first = 255 & ((int32 >> 24) >>> 0);
						var code = int32 >> 8;
						return A2($folkertdev$elm_flate$PrefixTable$Prefix, first, code);
					}
				case 1:
					var _v5 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex, input);
					if (_v5.$ === 1) {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var int32 = _v5.a;
						var first = 255 & ((255 & (int32 >> 16)) >>> 0);
						var code = 16777215 & int32;
						return A2($folkertdev$elm_flate$PrefixTable$Prefix, first, code);
					}
				case 2:
					var _v6 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex, input);
					if (_v6.$ === 1) {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var int32 = _v6.a;
						var _v7 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex + 1, input);
						if (_v7.$ === 1) {
							return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
						} else {
							var nextInt32 = _v7.a;
							var first = 255 & ((255 & (int32 >> 8)) >>> 0);
							var code = 16777215 & (((255 & (nextInt32 >> 24)) | ((65535 & int32) << 8)) >>> 0);
							return A2($folkertdev$elm_flate$PrefixTable$Prefix, first, code);
						}
					}
				default:
					var _v8 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex, input);
					if (_v8.$ === 1) {
						return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
					} else {
						var int32 = _v8.a;
						var _v9 = A2($folkertdev$elm_flate$Experimental$ByteArray$getInt32, internalIndex + 1, input);
						if (_v9.$ === 1) {
							return $folkertdev$elm_flate$PrefixTable$OutOfBounds;
						} else {
							var nextInt32 = _v9.a;
							var first = 255 & ((255 & int32) >>> 0);
							var code = (65535 & (nextInt32 >> 16)) | ((255 & int32) << 16);
							return A2($folkertdev$elm_flate$PrefixTable$Prefix, first, code);
						}
					}
			}
		}
	});
var $folkertdev$elm_flate$LZ77$updatePrefixTableLoop = F4(
	function (k, limit, buffer, prefixTable) {
		updatePrefixTableLoop:
		while (true) {
			if (_Utils_cmp(k, limit) < 0) {
				var _v0 = A2($folkertdev$elm_flate$PrefixTable$prefixAt, k, buffer);
				if (!_v0.$) {
					var code = _v0.b;
					var _v1 = A3($folkertdev$elm_flate$PrefixTable$insert, code, k, prefixTable);
					var newPrefixTable = _v1.a;
					var $temp$k = k + 1,
						$temp$limit = limit,
						$temp$buffer = buffer,
						$temp$prefixTable = newPrefixTable;
					k = $temp$k;
					limit = $temp$limit;
					buffer = $temp$buffer;
					prefixTable = $temp$prefixTable;
					continue updatePrefixTableLoop;
				} else {
					return prefixTable;
				}
			} else {
				return prefixTable;
			}
		}
	});
var $folkertdev$elm_flate$LZ77$flushLoop = F5(
	function (i, windowSize, buffer, prefixTable, encoders) {
		flushLoop:
		while (true) {
			var _v0 = A2($folkertdev$elm_flate$PrefixTable$prefixAt, i, buffer);
			switch (_v0.$) {
				case 3:
					return encoders;
				case 1:
					var p1 = _v0.a;
					return A2(
						$elm$core$Array$push,
						$folkertdev$elm_flate$LZ77$Literal(p1),
						encoders);
				case 2:
					var p1 = _v0.a;
					var p2 = _v0.b;
					return A2(
						$elm$core$Array$push,
						$folkertdev$elm_flate$LZ77$Literal(p2),
						A2(
							$elm$core$Array$push,
							$folkertdev$elm_flate$LZ77$Literal(p1),
							encoders));
				default:
					var p1 = _v0.a;
					var key = _v0.b;
					var _v1 = A3($folkertdev$elm_flate$PrefixTable$insert, key, i, prefixTable);
					var newPrefixTable = _v1.a;
					var matched = _v1.b;
					if (!matched.$) {
						var j = matched.a;
						var distance = i - j;
						if ((distance - windowSize) <= 0) {
							var length = 3 + A3($folkertdev$elm_flate$LZ77$longestCommonPrefix, i + 3, j + 3, buffer);
							var newEncoders = A2(
								$elm$core$Array$push,
								A2($folkertdev$elm_flate$LZ77$Pointer, length, distance),
								encoders);
							var newerPrefixTable = A4($folkertdev$elm_flate$LZ77$updatePrefixTableLoop, i + 1, i + length, buffer, newPrefixTable);
							var $temp$i = i + length,
								$temp$windowSize = windowSize,
								$temp$buffer = buffer,
								$temp$prefixTable = newerPrefixTable,
								$temp$encoders = newEncoders;
							i = $temp$i;
							windowSize = $temp$windowSize;
							buffer = $temp$buffer;
							prefixTable = $temp$prefixTable;
							encoders = $temp$encoders;
							continue flushLoop;
						} else {
							var $temp$i = i + 1,
								$temp$windowSize = windowSize,
								$temp$buffer = buffer,
								$temp$prefixTable = newPrefixTable,
								$temp$encoders = A2(
								$elm$core$Array$push,
								$folkertdev$elm_flate$LZ77$Literal(p1),
								encoders);
							i = $temp$i;
							windowSize = $temp$windowSize;
							buffer = $temp$buffer;
							prefixTable = $temp$prefixTable;
							encoders = $temp$encoders;
							continue flushLoop;
						}
					} else {
						var $temp$i = i + 1,
							$temp$windowSize = windowSize,
							$temp$buffer = buffer,
							$temp$prefixTable = newPrefixTable,
							$temp$encoders = A2(
							$elm$core$Array$push,
							$folkertdev$elm_flate$LZ77$Literal(p1),
							encoders);
						i = $temp$i;
						windowSize = $temp$windowSize;
						buffer = $temp$buffer;
						prefixTable = $temp$prefixTable;
						encoders = $temp$encoders;
						continue flushLoop;
					}
			}
		}
	});
var $folkertdev$elm_flate$PrefixTable$max_distance = 32768;
var $folkertdev$elm_flate$PrefixTable$max_window_size = $folkertdev$elm_flate$PrefixTable$max_distance;
var $folkertdev$elm_flate$PrefixTable$newLargePrefixTable = A2($elm$core$Array$repeat, 65535, _List_Nil);
var $folkertdev$elm_flate$PrefixTable$new = function (nbytes) {
	return (_Utils_cmp(nbytes, $folkertdev$elm_flate$PrefixTable$max_window_size) < 0) ? $folkertdev$elm_flate$PrefixTable$Small($elm$core$Dict$empty) : $folkertdev$elm_flate$PrefixTable$Large($folkertdev$elm_flate$PrefixTable$newLargePrefixTable);
};
var $folkertdev$elm_flate$LZ77$flush = F2(
	function (windowSize, buffer) {
		var codes = A5(
			$folkertdev$elm_flate$LZ77$flushLoop,
			0,
			windowSize,
			buffer,
			$folkertdev$elm_flate$PrefixTable$new(
				$folkertdev$elm_flate$Experimental$ByteArray$length(buffer)),
			$elm$core$Array$empty);
		return codes;
	});
var $folkertdev$elm_flate$Experimental$ByteArray$ByteArray = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var $folkertdev$elm_flate$Experimental$ByteArray$empty = A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, $elm$core$Array$empty, 0, 0);
var $elm$bytes$Bytes$Decode$andThen = F2(
	function (callback, _v0) {
		var decodeA = _v0;
		return F2(
			function (bites, offset) {
				var _v1 = A2(decodeA, bites, offset);
				var newOffset = _v1.a;
				var a = _v1.b;
				var _v2 = callback(a);
				var decodeB = _v2;
				return A2(decodeB, bites, newOffset);
			});
	});
var $folkertdev$elm_flate$Experimental$ByteArray$fromBytesHelp = function (_v0) {
	var remaining = _v0.a;
	var array = _v0.b;
	if (remaining >= 40) {
		return A2(
			$elm$bytes$Bytes$Decode$andThen,
			$elm$core$Basics$identity,
			A6(
				$elm$bytes$Bytes$Decode$map5,
				F5(
					function (a, b, c, d, e) {
						return A6(
							$elm$bytes$Bytes$Decode$map5,
							F5(
								function (f, g, h, i, j) {
									return $elm$bytes$Bytes$Decode$Loop(
										_Utils_Tuple2(
											remaining - 40,
											A2(
												$elm$core$Array$append,
												array,
												$elm$core$Array$fromList(
													_List_fromArray(
														[a, b, c, d, e, f, g, h, i, j])))));
								}),
							$elm$bytes$Bytes$Decode$unsignedInt32(1),
							$elm$bytes$Bytes$Decode$unsignedInt32(1),
							$elm$bytes$Bytes$Decode$unsignedInt32(1),
							$elm$bytes$Bytes$Decode$unsignedInt32(1),
							$elm$bytes$Bytes$Decode$unsignedInt32(1));
					}),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1)));
	} else {
		if (remaining >= 20) {
			return A6(
				$elm$bytes$Bytes$Decode$map5,
				F5(
					function (a, b, c, d, e) {
						return $elm$bytes$Bytes$Decode$Loop(
							_Utils_Tuple2(
								remaining - 20,
								A2(
									$elm$core$Array$push,
									e,
									A2(
										$elm$core$Array$push,
										d,
										A2(
											$elm$core$Array$push,
											c,
											A2(
												$elm$core$Array$push,
												b,
												A2($elm$core$Array$push, a, array)))))));
					}),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1),
				$elm$bytes$Bytes$Decode$unsignedInt32(1));
		} else {
			if (remaining >= 4) {
				return A2(
					$elm$bytes$Bytes$Decode$map,
					function (a) {
						return $elm$bytes$Bytes$Decode$Loop(
							_Utils_Tuple2(
								remaining - 4,
								A2($elm$core$Array$push, a, array)));
					},
					$elm$bytes$Bytes$Decode$unsignedInt32(1));
			} else {
				switch (remaining) {
					case 0:
						return $elm$bytes$Bytes$Decode$succeed(
							$elm$bytes$Bytes$Decode$Done(
								_Utils_Tuple3(0, 0, array)));
					case 1:
						return A2(
							$elm$bytes$Bytes$Decode$map,
							function (_byte) {
								return $elm$bytes$Bytes$Decode$Done(
									_Utils_Tuple3(1, _byte << 24, array));
							},
							$elm$bytes$Bytes$Decode$unsignedInt8);
					case 2:
						return A2(
							$elm$bytes$Bytes$Decode$map,
							function (_byte) {
								return $elm$bytes$Bytes$Decode$Done(
									_Utils_Tuple3(2, _byte << 16, array));
							},
							$elm$bytes$Bytes$Decode$unsignedInt16(1));
					default:
						return A3(
							$elm$bytes$Bytes$Decode$map2,
							F2(
								function (bytes, _byte) {
									return $elm$bytes$Bytes$Decode$Done(
										_Utils_Tuple3(3, (bytes << 16) | (_byte << 8), array));
								}),
							$elm$bytes$Bytes$Decode$unsignedInt16(1),
							$elm$bytes$Bytes$Decode$unsignedInt8);
				}
			}
		}
	}
};
var $folkertdev$elm_flate$Experimental$ByteArray$fromBytes = function (buffer) {
	var _v0 = A2(
		$elm$bytes$Bytes$Decode$decode,
		A2(
			$elm$bytes$Bytes$Decode$loop,
			_Utils_Tuple2(
				$elm$bytes$Bytes$width(buffer),
				$elm$core$Array$empty),
			$folkertdev$elm_flate$Experimental$ByteArray$fromBytesHelp),
		buffer);
	if (_v0.$ === 1) {
		return $folkertdev$elm_flate$Experimental$ByteArray$empty;
	} else {
		var _v1 = _v0.a;
		var finalSize = _v1.a;
		var finalBytes = _v1.b;
		var array = _v1.c;
		return A3($folkertdev$elm_flate$Experimental$ByteArray$ByteArray, array, finalSize, finalBytes);
	}
};
var $folkertdev$elm_flate$LZ77$encodeWithOptions = F2(
	function (_v0, buffer) {
		var windowSize = _v0.c8;
		return A2(
			$folkertdev$elm_flate$LZ77$flush,
			windowSize,
			$folkertdev$elm_flate$Experimental$ByteArray$fromBytes(buffer));
	});
var $folkertdev$elm_flate$ByteArray$decodeByteArrayHelp = function (_v0) {
	var remaining = _v0.a;
	var accum = _v0.b;
	return (remaining >= 4) ? A2(
		$elm$bytes$Bytes$Decode$map,
		function (_new) {
			var byte4 = 255 & (_new >>> 0);
			var byte3 = 255 & ((_new >> 8) >>> 0);
			var byte2 = 255 & ((_new >> 16) >>> 0);
			var byte1 = 255 & ((_new >> 24) >>> 0);
			var newAccum = A2(
				$elm$core$Array$push,
				byte4,
				A2(
					$elm$core$Array$push,
					byte3,
					A2(
						$elm$core$Array$push,
						byte2,
						A2($elm$core$Array$push, byte1, accum))));
			return $elm$bytes$Bytes$Decode$Loop(
				_Utils_Tuple2(remaining - 4, newAccum));
		},
		$elm$bytes$Bytes$Decode$unsignedInt32(1)) : ((remaining > 0) ? A2(
		$elm$bytes$Bytes$Decode$map,
		function (_new) {
			return $elm$bytes$Bytes$Decode$Loop(
				_Utils_Tuple2(
					remaining - 1,
					A2($elm$core$Array$push, _new, accum)));
		},
		$elm$bytes$Bytes$Decode$unsignedInt8) : $elm$bytes$Bytes$Decode$succeed(
		$elm$bytes$Bytes$Decode$Done(accum)));
};
var $folkertdev$elm_flate$ByteArray$decoder = function (n) {
	return A2(
		$elm$bytes$Bytes$Decode$loop,
		_Utils_Tuple2(n, $elm$core$Array$empty),
		$folkertdev$elm_flate$ByteArray$decodeByteArrayHelp);
};
var $folkertdev$elm_flate$ByteArray$fromBytes = function (buffer) {
	var _v0 = A2(
		$elm$bytes$Bytes$Decode$decode,
		$folkertdev$elm_flate$ByteArray$decoder(
			$elm$bytes$Bytes$width(buffer)),
		buffer);
	if (_v0.$ === 1) {
		return $elm$core$Array$empty;
	} else {
		var value = _v0.a;
		return value;
	}
};
var $folkertdev$elm_flate$Deflate$Internal$compress = F2(
	function (maybeWindowSize, buf) {
		if (maybeWindowSize.$ === 1) {
			return A2(
				$elm$core$Array$push,
				$folkertdev$elm_flate$Deflate$Symbol$EndOfBlock,
				A2(
					$elm$core$Array$map,
					$folkertdev$elm_flate$Deflate$Symbol$Literal,
					$folkertdev$elm_flate$ByteArray$fromBytes(buf)));
		} else {
			var windowSize = maybeWindowSize.a;
			return A2(
				$elm$core$Array$push,
				$folkertdev$elm_flate$Deflate$Symbol$EndOfBlock,
				A2(
					$elm$core$Array$map,
					$folkertdev$elm_flate$Deflate$Internal$codeToSymbol,
					A2(
						$folkertdev$elm_flate$LZ77$encodeWithOptions,
						{c8: windowSize},
						buf)));
		}
	});
var $elm$bytes$Bytes$Encode$U16 = F2(
	function (a, b) {
		return {$: 4, a: a, b: b};
	});
var $elm$bytes$Bytes$Encode$unsignedInt16 = $elm$bytes$Bytes$Encode$U16;
var $folkertdev$elm_flate$Deflate$BitWriter$flushIfNeeded = F3(
	function (tag, bitsWritten, encoders) {
		return (bitsWritten >= 16) ? {
			u: bitsWritten - 16,
			v: A2(
				$elm$core$List$cons,
				A2($elm$bytes$Bytes$Encode$unsignedInt16, 0, tag),
				encoders),
			A: tag >> 16
		} : {u: bitsWritten, v: encoders, A: tag};
	});
var $folkertdev$elm_flate$Deflate$BitWriter$writeBits = F3(
	function (bitwidth, bits, state) {
		return A3($folkertdev$elm_flate$Deflate$BitWriter$flushIfNeeded, state.A | (bits << state.u), state.u + bitwidth, state.v);
	});
var $folkertdev$elm_flate$Huffman$encode = F2(
	function (symbol, _v0) {
		var table = _v0;
		var _v1 = A2($elm$core$Array$get, symbol, table);
		if (_v1.$ === 1) {
			return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 0, 0);
		} else {
			var width = _v1.a.bL;
			var bits = _v1.a.a;
			return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, width, bits);
		}
	});
var $folkertdev$elm_flate$Deflate$Symbol$extraLength = function (symbol) {
	if (symbol.$ === 2) {
		var length = symbol.a;
		return (((length >= 3) && (length <= 10)) || (length === 258)) ? $elm$core$Maybe$Nothing : (((length >= 11) && (length <= 18)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				1,
				A2($elm$core$Basics$modBy, 2, length - 11))) : (((length >= 19) && (length <= 34)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				2,
				A2($elm$core$Basics$modBy, 4, length - 19))) : (((length >= 35) && (length <= 66)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				3,
				A2($elm$core$Basics$modBy, 8, length - 35))) : (((length >= 67) && (length <= 130)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				4,
				A2($elm$core$Basics$modBy, 16, length - 67))) : (((length >= 131) && (length <= 257)) ? $elm$core$Maybe$Just(
			_Utils_Tuple2(
				5,
				A2($elm$core$Basics$modBy, 32, length - 131))) : $elm$core$Maybe$Nothing)))));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $folkertdev$elm_flate$Deflate$Symbol$encode = F3(
	function (symbol, htrees, bitWriter) {
		var maybeExtra = function () {
			var _v2 = $folkertdev$elm_flate$Deflate$Symbol$extraLength(symbol);
			if (_v2.$ === 1) {
				return $elm$core$Basics$identity;
			} else {
				var _v3 = _v2.a;
				var bits = _v3.a;
				var extra = _v3.b;
				return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, bits, extra);
			}
		}();
		var maybeDistance = function () {
			var _v0 = $folkertdev$elm_flate$Deflate$Symbol$distance(symbol);
			if (_v0.$ === 1) {
				return $elm$core$Basics$identity;
			} else {
				var _v1 = _v0.a;
				var code_ = _v1.a;
				var bits = _v1.b;
				var extra = _v1.c;
				return A2(
					$elm$core$Basics$composeR,
					A2($folkertdev$elm_flate$Huffman$encode, code_, htrees.G),
					(bits > 0) ? A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, bits, extra) : $elm$core$Basics$identity);
			}
		}();
		return maybeDistance(
			maybeExtra(
				A3(
					$folkertdev$elm_flate$Huffman$encode,
					$folkertdev$elm_flate$Deflate$Symbol$code(symbol),
					htrees.I,
					bitWriter)));
	});
var $folkertdev$elm_flate$Deflate$Symbol$bitwidth_code_order = _List_fromArray(
	[16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var $folkertdev$elm_flate$Deflate$Symbol$calculateCodes = function (runLengths) {
	var loop2 = F3(
		function (r, c, codes) {
			loop2:
			while (true) {
				if (c >= 3) {
					var n = A2($elm$core$Basics$min, 6, c);
					var $temp$r = r,
						$temp$c = c - n,
						$temp$codes = A2(
						$elm$core$Array$push,
						_Utils_Tuple3(16, 2, n - 3),
						codes);
					r = $temp$r;
					c = $temp$c;
					codes = $temp$codes;
					continue loop2;
				} else {
					return A2(
						$elm$core$Array$append,
						codes,
						A2(
							$elm$core$Array$repeat,
							c,
							_Utils_Tuple3(r.c5, 0, 0)));
				}
			}
		});
	var loop1 = F2(
		function (c, codes) {
			loop1:
			while (true) {
				if (c >= 11) {
					var n = A2($elm$core$Basics$min, 138, c);
					var $temp$c = c - n,
						$temp$codes = A2(
						$elm$core$Array$push,
						_Utils_Tuple3(18, 7, n - 11),
						codes);
					c = $temp$c;
					codes = $temp$codes;
					continue loop1;
				} else {
					if (c >= 3) {
						return A2(
							$elm$core$Array$push,
							_Utils_Tuple3(17, 3, c - 3),
							codes);
					} else {
						return A2(
							$elm$core$Array$append,
							codes,
							A2(
								$elm$core$Array$repeat,
								c,
								_Utils_Tuple3(0, 0, 0)));
					}
				}
			}
		});
	var folder = F2(
		function (r, codes) {
			return (!r.c5) ? A2(loop1, r.F, codes) : A3(
				loop2,
				r,
				r.F - 1,
				A2(
					$elm$core$Array$push,
					_Utils_Tuple3(r.c5, 0, 0),
					codes));
		});
	return A3($elm$core$Array$foldl, folder, $elm$core$Array$empty, runLengths);
};
var $folkertdev$elm_flate$Huffman$getWidth = function (_v0) {
	var width = _v0.bL;
	return width;
};
var $folkertdev$elm_flate$Huffman$lookup = F2(
	function (symbol, _v0) {
		var array = _v0;
		return A2($elm$core$Array$get, symbol, array);
	});
var $folkertdev$elm_flate$Deflate$Symbol$calculateRunLengths = F2(
	function (lengths, accum) {
		calculateRunLengths:
		while (true) {
			if (!lengths.b) {
				return A3($elm$core$List$foldr, $elm$core$Array$push, $elm$core$Array$empty, accum);
			} else {
				var _v1 = lengths.a;
				var e = _v1.a;
				var size = _v1.b;
				var rest = lengths.b;
				var list = A2(
					$elm$core$List$indexedMap,
					$elm$core$Tuple$pair,
					A2(
						$elm$core$List$map,
						function (x) {
							return A2(
								$elm$core$Maybe$withDefault,
								0,
								A2(
									$elm$core$Maybe$map,
									$folkertdev$elm_flate$Huffman$getWidth,
									A2($folkertdev$elm_flate$Huffman$lookup, x, e)));
						},
						A2($elm$core$List$range, 0, size - 1)));
				var folder = F2(
					function (_v3, runLengths) {
						var i = _v3.a;
						var c = _v3.b;
						if (!runLengths.b) {
							return A2(
								$elm$core$List$cons,
								{F: 1, c5: c},
								runLengths);
						} else {
							var last = runLengths.a;
							var remaining = runLengths.b;
							return _Utils_eq(last.c5, c) ? A2(
								$elm$core$List$cons,
								{F: last.F + 1, c5: last.c5},
								remaining) : A2(
								$elm$core$List$cons,
								{F: 1, c5: c},
								runLengths);
						}
					});
				var $temp$lengths = rest,
					$temp$accum = A3($elm$core$List$foldl, folder, accum, list);
				lengths = $temp$lengths;
				accum = $temp$accum;
				continue calculateRunLengths;
			}
		}
	});
var $folkertdev$elm_flate$Deflate$Symbol$buildBitWidthCodes = F3(
	function (literalCodeCount, distanceCodeCount, trees) {
		var runLengths = A2(
			$folkertdev$elm_flate$Deflate$Symbol$calculateRunLengths,
			_List_fromArray(
				[
					_Utils_Tuple2(trees.I, literalCodeCount),
					_Utils_Tuple2(trees.G, distanceCodeCount)
				]),
			_List_Nil);
		return $folkertdev$elm_flate$Deflate$Symbol$calculateCodes(runLengths);
	});
var $folkertdev$elm_flate$Deflate$Symbol$positionLoop = F3(
	function (predicate, i, elements) {
		positionLoop:
		while (true) {
			if (!elements.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = elements.a;
				var xs = elements.b;
				if (predicate(x)) {
					return $elm$core$Maybe$Just(i);
				} else {
					var $temp$predicate = predicate,
						$temp$i = i + 1,
						$temp$elements = xs;
					predicate = $temp$predicate;
					i = $temp$i;
					elements = $temp$elements;
					continue positionLoop;
				}
			}
		}
	});
var $folkertdev$elm_flate$Deflate$Symbol$position = F2(
	function (predicate, elements) {
		return A3($folkertdev$elm_flate$Deflate$Symbol$positionLoop, predicate, 0, elements);
	});
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $folkertdev$elm_flate$Huffman$positionFromTheEnd = F2(
	function (predicated, array) {
		var folder = F2(
			function (element, _v1) {
				var index = _v1.a;
				var accum = _v1.b;
				if (!accum.$) {
					return _Utils_Tuple2(index, accum);
				} else {
					return predicated(element) ? _Utils_Tuple2(
						index,
						$elm$core$Maybe$Just(index)) : _Utils_Tuple2(index - 1, $elm$core$Maybe$Nothing);
				}
			});
		var finalIndex = $elm$core$Array$length(array) - 1;
		return A2(
			$elm$core$Maybe$map,
			function (v) {
				return finalIndex - v;
			},
			A3(
				$elm$core$Array$foldr,
				folder,
				_Utils_Tuple2(finalIndex, $elm$core$Maybe$Nothing),
				array).b);
	});
var $folkertdev$elm_flate$Huffman$usedMaxSymbol = function (_v0) {
	var array = _v0;
	return A2(
		$elm$core$Maybe$map,
		function (trailingZeros) {
			return ($elm$core$Array$length(array) - 1) - trailingZeros;
		},
		A2(
			$folkertdev$elm_flate$Huffman$positionFromTheEnd,
			function (_v1) {
				var value = _v1;
				return value.bL > 0;
			},
			array));
};
var $folkertdev$elm_flate$Deflate$Symbol$writeDynamicHuffmanCodec = F2(
	function (trees, bitWriter) {
		var literal_code_count = A2(
			$elm$core$Basics$max,
			257,
			A2(
				$elm$core$Maybe$withDefault,
				0,
				$folkertdev$elm_flate$Huffman$usedMaxSymbol(trees.I)) + 1);
		var distance_code_count = A2(
			$elm$core$Basics$max,
			1,
			A2(
				$elm$core$Maybe$withDefault,
				0,
				$folkertdev$elm_flate$Huffman$usedMaxSymbol(trees.G)) + 1);
		var codes = A3(
			$folkertdev$elm_flate$Deflate$Symbol$buildBitWidthCodes,
			literal_code_count,
			distance_code_count,
			{G: trees.G, I: trees.I});
		var codeCounts = A3(
			$elm$core$Array$foldl,
			function (_v2) {
				var i = _v2.a;
				return A2(
					$folkertdev$elm_flate$Deflate$Symbol$update,
					i,
					function (v) {
						return v + 1;
					});
			},
			A2($elm$core$Array$repeat, 19, 0),
			codes);
		var bitWidthEncoder = A2($folkertdev$elm_flate$Huffman$fromFrequencies, codeCounts, 7);
		var bitwidthCodeCount = A2(
			$elm$core$Basics$max,
			4,
			A2(
				$elm$core$Maybe$withDefault,
				0,
				A2(
					$elm$core$Maybe$map,
					function (trailingZeros) {
						return 19 - trailingZeros;
					},
					A2(
						$folkertdev$elm_flate$Deflate$Symbol$position,
						function (i) {
							var _v1 = A2($folkertdev$elm_flate$Huffman$lookup, i, bitWidthEncoder);
							if (_v1.$ === 1) {
								return false;
							} else {
								var value = _v1.a;
								return $folkertdev$elm_flate$Huffman$getWidth(value) > 0;
							}
						},
						$elm$core$List$reverse($folkertdev$elm_flate$Deflate$Symbol$bitwidth_code_order)))));
		var v1 = function (writer) {
			return A3(
				$elm$core$List$foldl,
				F2(
					function (i, current) {
						var width = _Utils_eq(
							A2($elm$core$Array$get, i, codeCounts),
							$elm$core$Maybe$Just(0)) ? 0 : A2(
							$elm$core$Maybe$withDefault,
							0,
							A2(
								$elm$core$Maybe$map,
								$folkertdev$elm_flate$Huffman$getWidth,
								A2($folkertdev$elm_flate$Huffman$lookup, i, bitWidthEncoder)));
						return A3($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 3, width, current);
					}),
				writer,
				A2($elm$core$List$take, bitwidthCodeCount, $folkertdev$elm_flate$Deflate$Symbol$bitwidth_code_order));
		};
		var v2 = function (writer) {
			return A3(
				$elm$core$Array$foldl,
				F2(
					function (_v0, current) {
						var code_ = _v0.a;
						var bits = _v0.b;
						var extra = _v0.c;
						return (bits > 0) ? A3(
							$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
							bits,
							extra,
							A3($folkertdev$elm_flate$Huffman$encode, code_, bitWidthEncoder, current)) : A3($folkertdev$elm_flate$Huffman$encode, code_, bitWidthEncoder, current);
					}),
				writer,
				codes);
		};
		return v2(
			v1(
				A3(
					$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
					4,
					bitwidthCodeCount - 4,
					A3(
						$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
						5,
						distance_code_count - 1,
						A3($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 5, literal_code_count - 257, bitWriter)))));
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeCompressDynamic = F3(
	function (maybeWindowSize, buf, bitWriter) {
		var compressed = A2($folkertdev$elm_flate$Deflate$Internal$compress, maybeWindowSize, buf);
		var huffmanTree = $folkertdev$elm_flate$Deflate$Symbol$buildDynamicHuffmanCodec(compressed);
		var huffmanTreeWriter = A2($folkertdev$elm_flate$Deflate$Symbol$writeDynamicHuffmanCodec, huffmanTree, bitWriter);
		return A3(
			$elm$core$Array$foldl,
			F2(
				function (symbol, first) {
					return A3($folkertdev$elm_flate$Deflate$Symbol$encode, symbol, huffmanTree, first);
				}),
			huffmanTreeWriter,
			compressed);
	});
var $folkertdev$elm_flate$Deflate$BitWriter$writeBit = function (b) {
	if (!b) {
		return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 1, 0);
	} else {
		return A2($folkertdev$elm_flate$Deflate$BitWriter$writeBits, 1, 1);
	}
};
var $folkertdev$elm_flate$Deflate$Internal$encodeDynamicBlock = F3(
	function (windowSize, _v0, bitWriter) {
		var isLastBlock = _v0.a;
		var buffer = _v0.b;
		return A3(
			$folkertdev$elm_flate$Deflate$Internal$encodeCompressDynamic,
			windowSize,
			buffer,
			A3(
				$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
				2,
				2,
				A2($folkertdev$elm_flate$Deflate$BitWriter$writeBit, isLastBlock, bitWriter)));
	});
var $elm$bytes$Bytes$Encode$U8 = function (a) {
	return {$: 3, a: a};
};
var $elm$bytes$Bytes$Encode$unsignedInt8 = $elm$bytes$Bytes$Encode$U8;
var $folkertdev$elm_flate$Deflate$BitWriter$flushLoop = F3(
	function (tag, bitsWritten, encoders) {
		flushLoop:
		while (true) {
			if (bitsWritten > 0) {
				var $temp$tag = tag >> 8,
					$temp$bitsWritten = A2($elm$core$Basics$max, 0, bitsWritten - 8),
					$temp$encoders = A2(
					$elm$core$List$cons,
					$elm$bytes$Bytes$Encode$unsignedInt8(tag),
					encoders);
				tag = $temp$tag;
				bitsWritten = $temp$bitsWritten;
				encoders = $temp$encoders;
				continue flushLoop;
			} else {
				return {u: bitsWritten, v: encoders, A: tag};
			}
		}
	});
var $folkertdev$elm_flate$Deflate$BitWriter$flush = function (state) {
	return A3($folkertdev$elm_flate$Deflate$BitWriter$flushLoop, state.A, state.u, state.v);
};
var $folkertdev$elm_flate$Deflate$BitWriter$run = function (state) {
	return $elm$core$List$reverse(state.v);
};
var $folkertdev$elm_flate$Deflate$Internal$encodeDynamic = F2(
	function (windowSize, buffer) {
		var encodedChunks = A2(
			$elm$core$List$map,
			$folkertdev$elm_flate$Deflate$Internal$encodeDynamicBlock(windowSize),
			A2($folkertdev$elm_flate$Deflate$Internal$chunks, $folkertdev$elm_flate$Deflate$Internal$default_block_size, buffer));
		return $elm$bytes$Bytes$Encode$encode(
			$elm$bytes$Bytes$Encode$sequence(
				$folkertdev$elm_flate$Deflate$BitWriter$run(
					$folkertdev$elm_flate$Deflate$BitWriter$flush(
						A3(
							$elm$core$List$foldl,
							F2(
								function (chunk, first) {
									return chunk(first);
								}),
							$folkertdev$elm_flate$Deflate$BitWriter$empty,
							encodedChunks)))));
	});
var $elm$core$Bitwise$complement = _Bitwise_complement;
var $folkertdev$elm_flate$Deflate$Internal$max_non_compressed_block_size = 65535;
var $folkertdev$elm_flate$ByteArray$fasterEncodeFolderR = F2(
	function (_byte, _v0) {
		var bytesOnAccum = _v0.a;
		var accum = _v0.b;
		var encoders = _v0.c;
		switch (bytesOnAccum) {
			case 0:
				var value = 255 & _byte;
				return _Utils_Tuple3(1, value, encoders);
			case 1:
				var value = accum | ((255 & _byte) << 8);
				return _Utils_Tuple3(2, value, encoders);
			case 2:
				var value = accum | ((255 & _byte) << 16);
				return _Utils_Tuple3(3, value, encoders);
			default:
				var value = accum | ((255 & _byte) << 24);
				return _Utils_Tuple3(
					0,
					0,
					A2(
						$elm$core$List$cons,
						A2($elm$bytes$Bytes$Encode$unsignedInt32, 1, value),
						encoders));
		}
	});
var $folkertdev$elm_flate$ByteArray$fasterEncodeR = function (_v0) {
	var bytesOnAccum = _v0.a;
	var accum = _v0.b;
	var otherEncoders = _v0.c;
	var encoders = function () {
		switch (bytesOnAccum) {
			case 0:
				return otherEncoders;
			case 1:
				return A2(
					$elm$core$List$cons,
					$elm$bytes$Bytes$Encode$unsignedInt8(accum),
					otherEncoders);
			case 2:
				return A2(
					$elm$core$List$cons,
					A2($elm$bytes$Bytes$Encode$unsignedInt16, 1, accum),
					otherEncoders);
			default:
				var otherBytes = accum >> 8;
				var firstByte = 255 & accum;
				return A2(
					$elm$core$List$cons,
					A2($elm$bytes$Bytes$Encode$unsignedInt16, 1, otherBytes),
					A2(
						$elm$core$List$cons,
						$elm$bytes$Bytes$Encode$unsignedInt8(firstByte),
						otherEncoders));
		}
	}();
	return encoders;
};
var $folkertdev$elm_flate$ByteArray$toBytes = function (array) {
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			$folkertdev$elm_flate$ByteArray$fasterEncodeR(
				A3(
					$elm$core$Array$foldr,
					$folkertdev$elm_flate$ByteArray$fasterEncodeFolderR,
					_Utils_Tuple3(0, 0, _List_Nil),
					array))));
};
var $folkertdev$elm_flate$Deflate$BitWriter$writeEncoder = F2(
	function (encoder, state) {
		return {
			u: state.u,
			v: A2($elm$core$List$cons, encoder, state.v),
			A: state.A
		};
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeRawBlock = F2(
	function (_v0, bitWriter) {
		var isLastBlock = _v0.a;
		var buffer = _v0.b;
		var byteArray = $folkertdev$elm_flate$ByteArray$fromBytes(buffer);
		var size = A2(
			$elm$core$Basics$min,
			$elm$core$Array$length(byteArray),
			$folkertdev$elm_flate$Deflate$Internal$max_non_compressed_block_size);
		var sliced = A3($elm$core$Array$slice, 0, size, byteArray);
		return A2(
			$folkertdev$elm_flate$Deflate$BitWriter$writeEncoder,
			$elm$bytes$Bytes$Encode$bytes(
				$folkertdev$elm_flate$ByteArray$toBytes(sliced)),
			A2(
				$folkertdev$elm_flate$Deflate$BitWriter$writeEncoder,
				A2($elm$bytes$Bytes$Encode$unsignedInt16, 0, ~size),
				A2(
					$folkertdev$elm_flate$Deflate$BitWriter$writeEncoder,
					A2($elm$bytes$Bytes$Encode$unsignedInt16, 0, size),
					$folkertdev$elm_flate$Deflate$BitWriter$flush(
						A3(
							$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
							2,
							0,
							A2($folkertdev$elm_flate$Deflate$BitWriter$writeBit, isLastBlock, bitWriter))))));
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeRaw = function (buffer) {
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			$folkertdev$elm_flate$Deflate$BitWriter$run(
				A3(
					$elm$core$List$foldl,
					F2(
						function (chunk, first) {
							return A2($folkertdev$elm_flate$Deflate$Internal$encodeRawBlock, chunk, first);
						}),
					$folkertdev$elm_flate$Deflate$BitWriter$empty,
					A2(
						$folkertdev$elm_flate$Deflate$Internal$chunks,
						A2($elm$core$Basics$min, $folkertdev$elm_flate$Deflate$Internal$max_non_compressed_block_size, $folkertdev$elm_flate$Deflate$Internal$default_block_size),
						buffer)))));
};
var $folkertdev$elm_flate$Huffman$fromList = A2(
	$elm$core$Basics$composeL,
	A2($elm$core$Basics$composeL, $elm$core$Basics$identity, $elm$core$Array$fromList),
	$elm$core$List$map($folkertdev$elm_flate$Huffman$codeFromRecord));
var $folkertdev$elm_flate$Huffman$hardcodedStaticHuffmanTree = {
	G: $folkertdev$elm_flate$Huffman$fromList(
		_List_fromArray(
			[
				{a: 0, bL: 5},
				{a: 16, bL: 5},
				{a: 8, bL: 5},
				{a: 24, bL: 5},
				{a: 4, bL: 5},
				{a: 20, bL: 5},
				{a: 12, bL: 5},
				{a: 28, bL: 5},
				{a: 2, bL: 5},
				{a: 18, bL: 5},
				{a: 10, bL: 5},
				{a: 26, bL: 5},
				{a: 6, bL: 5},
				{a: 22, bL: 5},
				{a: 14, bL: 5},
				{a: 30, bL: 5},
				{a: 1, bL: 5},
				{a: 17, bL: 5},
				{a: 9, bL: 5},
				{a: 25, bL: 5},
				{a: 5, bL: 5},
				{a: 21, bL: 5},
				{a: 13, bL: 5},
				{a: 29, bL: 5},
				{a: 3, bL: 5},
				{a: 19, bL: 5},
				{a: 11, bL: 5},
				{a: 27, bL: 5},
				{a: 7, bL: 5},
				{a: 23, bL: 5}
			])),
	I: $folkertdev$elm_flate$Huffman$fromList(
		_List_fromArray(
			[
				{a: 12, bL: 8},
				{a: 140, bL: 8},
				{a: 76, bL: 8},
				{a: 204, bL: 8},
				{a: 44, bL: 8},
				{a: 172, bL: 8},
				{a: 108, bL: 8},
				{a: 236, bL: 8},
				{a: 28, bL: 8},
				{a: 156, bL: 8},
				{a: 92, bL: 8},
				{a: 220, bL: 8},
				{a: 60, bL: 8},
				{a: 188, bL: 8},
				{a: 124, bL: 8},
				{a: 252, bL: 8},
				{a: 2, bL: 8},
				{a: 130, bL: 8},
				{a: 66, bL: 8},
				{a: 194, bL: 8},
				{a: 34, bL: 8},
				{a: 162, bL: 8},
				{a: 98, bL: 8},
				{a: 226, bL: 8},
				{a: 18, bL: 8},
				{a: 146, bL: 8},
				{a: 82, bL: 8},
				{a: 210, bL: 8},
				{a: 50, bL: 8},
				{a: 178, bL: 8},
				{a: 114, bL: 8},
				{a: 242, bL: 8},
				{a: 10, bL: 8},
				{a: 138, bL: 8},
				{a: 74, bL: 8},
				{a: 202, bL: 8},
				{a: 42, bL: 8},
				{a: 170, bL: 8},
				{a: 106, bL: 8},
				{a: 234, bL: 8},
				{a: 26, bL: 8},
				{a: 154, bL: 8},
				{a: 90, bL: 8},
				{a: 218, bL: 8},
				{a: 58, bL: 8},
				{a: 186, bL: 8},
				{a: 122, bL: 8},
				{a: 250, bL: 8},
				{a: 6, bL: 8},
				{a: 134, bL: 8},
				{a: 70, bL: 8},
				{a: 198, bL: 8},
				{a: 38, bL: 8},
				{a: 166, bL: 8},
				{a: 102, bL: 8},
				{a: 230, bL: 8},
				{a: 22, bL: 8},
				{a: 150, bL: 8},
				{a: 86, bL: 8},
				{a: 214, bL: 8},
				{a: 54, bL: 8},
				{a: 182, bL: 8},
				{a: 118, bL: 8},
				{a: 246, bL: 8},
				{a: 14, bL: 8},
				{a: 142, bL: 8},
				{a: 78, bL: 8},
				{a: 206, bL: 8},
				{a: 46, bL: 8},
				{a: 174, bL: 8},
				{a: 110, bL: 8},
				{a: 238, bL: 8},
				{a: 30, bL: 8},
				{a: 158, bL: 8},
				{a: 94, bL: 8},
				{a: 222, bL: 8},
				{a: 62, bL: 8},
				{a: 190, bL: 8},
				{a: 126, bL: 8},
				{a: 254, bL: 8},
				{a: 1, bL: 8},
				{a: 129, bL: 8},
				{a: 65, bL: 8},
				{a: 193, bL: 8},
				{a: 33, bL: 8},
				{a: 161, bL: 8},
				{a: 97, bL: 8},
				{a: 225, bL: 8},
				{a: 17, bL: 8},
				{a: 145, bL: 8},
				{a: 81, bL: 8},
				{a: 209, bL: 8},
				{a: 49, bL: 8},
				{a: 177, bL: 8},
				{a: 113, bL: 8},
				{a: 241, bL: 8},
				{a: 9, bL: 8},
				{a: 137, bL: 8},
				{a: 73, bL: 8},
				{a: 201, bL: 8},
				{a: 41, bL: 8},
				{a: 169, bL: 8},
				{a: 105, bL: 8},
				{a: 233, bL: 8},
				{a: 25, bL: 8},
				{a: 153, bL: 8},
				{a: 89, bL: 8},
				{a: 217, bL: 8},
				{a: 57, bL: 8},
				{a: 185, bL: 8},
				{a: 121, bL: 8},
				{a: 249, bL: 8},
				{a: 5, bL: 8},
				{a: 133, bL: 8},
				{a: 69, bL: 8},
				{a: 197, bL: 8},
				{a: 37, bL: 8},
				{a: 165, bL: 8},
				{a: 101, bL: 8},
				{a: 229, bL: 8},
				{a: 21, bL: 8},
				{a: 149, bL: 8},
				{a: 85, bL: 8},
				{a: 213, bL: 8},
				{a: 53, bL: 8},
				{a: 181, bL: 8},
				{a: 117, bL: 8},
				{a: 245, bL: 8},
				{a: 13, bL: 8},
				{a: 141, bL: 8},
				{a: 77, bL: 8},
				{a: 205, bL: 8},
				{a: 45, bL: 8},
				{a: 173, bL: 8},
				{a: 109, bL: 8},
				{a: 237, bL: 8},
				{a: 29, bL: 8},
				{a: 157, bL: 8},
				{a: 93, bL: 8},
				{a: 221, bL: 8},
				{a: 61, bL: 8},
				{a: 189, bL: 8},
				{a: 125, bL: 8},
				{a: 253, bL: 8},
				{a: 19, bL: 9},
				{a: 275, bL: 9},
				{a: 147, bL: 9},
				{a: 403, bL: 9},
				{a: 83, bL: 9},
				{a: 339, bL: 9},
				{a: 211, bL: 9},
				{a: 467, bL: 9},
				{a: 51, bL: 9},
				{a: 307, bL: 9},
				{a: 179, bL: 9},
				{a: 435, bL: 9},
				{a: 115, bL: 9},
				{a: 371, bL: 9},
				{a: 243, bL: 9},
				{a: 499, bL: 9},
				{a: 11, bL: 9},
				{a: 267, bL: 9},
				{a: 139, bL: 9},
				{a: 395, bL: 9},
				{a: 75, bL: 9},
				{a: 331, bL: 9},
				{a: 203, bL: 9},
				{a: 459, bL: 9},
				{a: 43, bL: 9},
				{a: 299, bL: 9},
				{a: 171, bL: 9},
				{a: 427, bL: 9},
				{a: 107, bL: 9},
				{a: 363, bL: 9},
				{a: 235, bL: 9},
				{a: 491, bL: 9},
				{a: 27, bL: 9},
				{a: 283, bL: 9},
				{a: 155, bL: 9},
				{a: 411, bL: 9},
				{a: 91, bL: 9},
				{a: 347, bL: 9},
				{a: 219, bL: 9},
				{a: 475, bL: 9},
				{a: 59, bL: 9},
				{a: 315, bL: 9},
				{a: 187, bL: 9},
				{a: 443, bL: 9},
				{a: 123, bL: 9},
				{a: 379, bL: 9},
				{a: 251, bL: 9},
				{a: 507, bL: 9},
				{a: 7, bL: 9},
				{a: 263, bL: 9},
				{a: 135, bL: 9},
				{a: 391, bL: 9},
				{a: 71, bL: 9},
				{a: 327, bL: 9},
				{a: 199, bL: 9},
				{a: 455, bL: 9},
				{a: 39, bL: 9},
				{a: 295, bL: 9},
				{a: 167, bL: 9},
				{a: 423, bL: 9},
				{a: 103, bL: 9},
				{a: 359, bL: 9},
				{a: 231, bL: 9},
				{a: 487, bL: 9},
				{a: 23, bL: 9},
				{a: 279, bL: 9},
				{a: 151, bL: 9},
				{a: 407, bL: 9},
				{a: 87, bL: 9},
				{a: 343, bL: 9},
				{a: 215, bL: 9},
				{a: 471, bL: 9},
				{a: 55, bL: 9},
				{a: 311, bL: 9},
				{a: 183, bL: 9},
				{a: 439, bL: 9},
				{a: 119, bL: 9},
				{a: 375, bL: 9},
				{a: 247, bL: 9},
				{a: 503, bL: 9},
				{a: 15, bL: 9},
				{a: 271, bL: 9},
				{a: 143, bL: 9},
				{a: 399, bL: 9},
				{a: 79, bL: 9},
				{a: 335, bL: 9},
				{a: 207, bL: 9},
				{a: 463, bL: 9},
				{a: 47, bL: 9},
				{a: 303, bL: 9},
				{a: 175, bL: 9},
				{a: 431, bL: 9},
				{a: 111, bL: 9},
				{a: 367, bL: 9},
				{a: 239, bL: 9},
				{a: 495, bL: 9},
				{a: 31, bL: 9},
				{a: 287, bL: 9},
				{a: 159, bL: 9},
				{a: 415, bL: 9},
				{a: 95, bL: 9},
				{a: 351, bL: 9},
				{a: 223, bL: 9},
				{a: 479, bL: 9},
				{a: 63, bL: 9},
				{a: 319, bL: 9},
				{a: 191, bL: 9},
				{a: 447, bL: 9},
				{a: 127, bL: 9},
				{a: 383, bL: 9},
				{a: 255, bL: 9},
				{a: 511, bL: 9},
				{a: 0, bL: 7},
				{a: 64, bL: 7},
				{a: 32, bL: 7},
				{a: 96, bL: 7},
				{a: 16, bL: 7},
				{a: 80, bL: 7},
				{a: 48, bL: 7},
				{a: 112, bL: 7},
				{a: 8, bL: 7},
				{a: 72, bL: 7},
				{a: 40, bL: 7},
				{a: 104, bL: 7},
				{a: 24, bL: 7},
				{a: 88, bL: 7},
				{a: 56, bL: 7},
				{a: 120, bL: 7},
				{a: 4, bL: 7},
				{a: 68, bL: 7},
				{a: 36, bL: 7},
				{a: 100, bL: 7},
				{a: 20, bL: 7},
				{a: 84, bL: 7},
				{a: 52, bL: 7},
				{a: 116, bL: 7},
				{a: 3, bL: 8},
				{a: 131, bL: 8},
				{a: 67, bL: 8},
				{a: 195, bL: 8},
				{a: 35, bL: 8},
				{a: 163, bL: 8},
				{a: 99, bL: 8},
				{a: 227, bL: 8}
			]))
};
var $folkertdev$elm_flate$Deflate$Internal$encodeCompressStatic = F3(
	function (maybeWindowSize, buf, bitWriter) {
		var huffmanTrees = $folkertdev$elm_flate$Huffman$hardcodedStaticHuffmanTree;
		var compressed = A2($folkertdev$elm_flate$Deflate$Internal$compress, maybeWindowSize, buf);
		return A3(
			$elm$core$Array$foldl,
			F2(
				function (symbol, first) {
					return A3($folkertdev$elm_flate$Deflate$Symbol$encode, symbol, huffmanTrees, first);
				}),
			bitWriter,
			compressed);
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeStaticBlock = F3(
	function (windowSize, _v0, bitWriter) {
		var isLastBlock = _v0.a;
		var buffer = _v0.b;
		return A3(
			$folkertdev$elm_flate$Deflate$Internal$encodeCompressStatic,
			windowSize,
			buffer,
			A3(
				$folkertdev$elm_flate$Deflate$BitWriter$writeBits,
				2,
				1,
				A2($folkertdev$elm_flate$Deflate$BitWriter$writeBit, isLastBlock, bitWriter)));
	});
var $folkertdev$elm_flate$Deflate$Internal$encodeStatic = F2(
	function (windowSize, buffer) {
		return $elm$bytes$Bytes$Encode$encode(
			$elm$bytes$Bytes$Encode$sequence(
				$folkertdev$elm_flate$Deflate$BitWriter$run(
					$folkertdev$elm_flate$Deflate$BitWriter$flush(
						A3(
							$elm$core$List$foldl,
							F2(
								function (chunk, first) {
									return A3($folkertdev$elm_flate$Deflate$Internal$encodeStaticBlock, windowSize, chunk, first);
								}),
							$folkertdev$elm_flate$Deflate$BitWriter$empty,
							A2($folkertdev$elm_flate$Deflate$Internal$chunks, $folkertdev$elm_flate$Deflate$Internal$default_block_size, buffer))))));
	});
var $folkertdev$elm_flate$Flate$deflateWithOptions = F2(
	function (encoding, buffer) {
		switch (encoding.$) {
			case 0:
				return $folkertdev$elm_flate$Deflate$Internal$encodeRaw(buffer);
			case 2:
				if (!encoding.a.$) {
					var _v1 = encoding.a;
					return A2($folkertdev$elm_flate$Deflate$Internal$encodeStatic, $elm$core$Maybe$Nothing, buffer);
				} else {
					var w = encoding.a.a;
					return A2(
						$folkertdev$elm_flate$Deflate$Internal$encodeStatic,
						$elm$core$Maybe$Just(w),
						buffer);
				}
			default:
				if (!encoding.a.$) {
					var _v2 = encoding.a;
					return A2($folkertdev$elm_flate$Deflate$Internal$encodeDynamic, $elm$core$Maybe$Nothing, buffer);
				} else {
					var w = encoding.a.a;
					return A2(
						$folkertdev$elm_flate$Deflate$Internal$encodeDynamic,
						$elm$core$Maybe$Just(w),
						buffer);
				}
		}
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Basics$pow = _Basics_pow;
var $folkertdev$elm_flate$Flate$deflateZlibWithOptions = F2(
	function (encoding, buffer) {
		var windowSizeHelp = function (size) {
			var kb = 1024;
			return (size <= 256) ? 0 : ((size <= 512) ? 1 : ((_Utils_cmp(size, 1 * kb) < 1) ? 2 : ((_Utils_cmp(size, 2 * kb) < 1) ? 3 : ((_Utils_cmp(size, 4 * kb) < 1) ? 4 : ((_Utils_cmp(size, 8 * kb) < 1) ? 5 : ((_Utils_cmp(size, 16 * kb) < 1) ? 6 : ((_Utils_cmp(size, 32 * kb) < 1) ? 7 : 0)))))));
		};
		var windowSize = function () {
			switch (encoding.$) {
				case 0:
					return 0;
				case 2:
					if (!encoding.a.$) {
						var _v1 = encoding.a;
						return 0;
					} else {
						var size = encoding.a.a;
						return windowSizeHelp(size);
					}
				default:
					if (!encoding.a.$) {
						var _v2 = encoding.a;
						return 0;
					} else {
						var size = encoding.a.a;
						return windowSizeHelp(size);
					}
			}
		}();
		var mask16 = function (value) {
			return value & (A2($elm$core$Basics$pow, 2, 16) - 1);
		};
		var encodedTrailer = _List_fromArray(
			[
				A2(
				$elm$bytes$Bytes$Encode$unsignedInt32,
				1,
				$folkertdev$elm_flate$Checksum$Adler32$adler32(buffer))
			]);
		var data = A2($folkertdev$elm_flate$Flate$deflateWithOptions, encoding, buffer);
		var compressionLevel = 2;
		var cmf = (windowSize << 4) | 8;
		var check = (cmf << 8) + (compressionLevel << 6);
		var flag = (!(!A2($elm$core$Basics$modBy, 31, check))) ? ((compressionLevel << 6) + (31 - A2($elm$core$Basics$modBy, 31, check))) : (compressionLevel << 6);
		var encodedHeader = _List_fromArray(
			[
				$elm$bytes$Bytes$Encode$unsignedInt8(cmf),
				$elm$bytes$Bytes$Encode$unsignedInt8(flag)
			]);
		return $elm$bytes$Bytes$Encode$encode(
			$elm$bytes$Bytes$Encode$sequence(
				_Utils_ap(
					encodedHeader,
					_Utils_ap(
						_List_fromArray(
							[
								$elm$bytes$Bytes$Encode$bytes(data)
							]),
						encodedTrailer))));
	});
var $folkertdev$elm_flate$LZ77$max_distance = 32768;
var $folkertdev$elm_flate$LZ77$maxWindowSize = $folkertdev$elm_flate$LZ77$max_distance;
var $folkertdev$elm_flate$Flate$deflateZlib = $folkertdev$elm_flate$Flate$deflateZlibWithOptions(
	$folkertdev$elm_flate$Flate$Dynamic(
		$folkertdev$elm_flate$Flate$WithWindowSize($folkertdev$elm_flate$LZ77$maxWindowSize)));
var $justgook$elm_image$Image$Internal$PNG$packIntoInt32 = F4(
	function (r, g, b, a) {
		return (((255 & r) << 24) | ((255 & g) << 16)) | (((255 & b) << 8) | (255 & a));
	});
var $justgook$elm_image$Image$Internal$PNG$encodePixel32 = F2(
	function (px, prev) {
		var r = px >>> 24;
		var prevR = prev >>> 24;
		var prevG = 255 & (prev >> 16);
		var prevB = 255 & (prev >> 8);
		var prevA = 255 & prev;
		var g = 255 & (px >> 16);
		var b = 255 & (px >> 8);
		var a = 255 & px;
		return A2(
			$elm$bytes$Bytes$Encode$unsignedInt32,
			1,
			A4($justgook$elm_image$Image$Internal$PNG$packIntoInt32, r - prevR, g - prevG, b - prevB, a - prevA));
	});
var $justgook$elm_image$Image$Internal$PNG$encodeIDAT = F2(
	function (_v0, arr) {
		var order = _v0.bl;
		var scanLineFilter = $elm$bytes$Bytes$Encode$unsignedInt8(1);
		var _v1 = function () {
			switch (order) {
				case 0:
					return _Utils_Tuple2($elm$core$Array$foldl, $elm$core$Array$foldl);
				case 1:
					return _Utils_Tuple2($elm$core$Array$foldr, $elm$core$Array$foldl);
				case 2:
					return _Utils_Tuple2($elm$core$Array$foldl, $elm$core$Array$foldr);
				default:
					return _Utils_Tuple2($elm$core$Array$foldr, $elm$core$Array$foldr);
			}
		}();
		var fold1 = _v1.a;
		var fold2 = _v1.b;
		return A3(
			$elm$core$Basics$composeR,
			$elm$bytes$Bytes$Encode$encode,
			A2($elm$core$Basics$composeR, $folkertdev$elm_flate$Flate$deflateZlib, $elm$bytes$Bytes$Encode$bytes),
			A3(
				fold1,
				F2(
					function (sArr, acc) {
						return function (_v4) {
							var line = _v4.b;
							return $elm$bytes$Bytes$Encode$sequence(
								_List_fromArray(
									[acc, line]));
						}(
							A3(
								fold2,
								F2(
									function (px, _v3) {
										var prev = _v3.a;
										var acc2 = _v3.b;
										var packed = A2($justgook$elm_image$Image$Internal$PNG$encodePixel32, px, prev);
										return _Utils_Tuple2(
											px,
											$elm$bytes$Bytes$Encode$sequence(
												_List_fromArray(
													[acc2, packed])));
									}),
								_Utils_Tuple2(0, scanLineFilter),
								sArr));
					}),
				$elm$bytes$Bytes$Encode$sequence(_List_Nil),
				arr));
	});
var $justgook$elm_image$Image$Internal$PNG$encodeIHDR = F3(
	function (width, height, _v0) {
		var format = _v0.a$;
		var interlace = 0;
		var _v1 = function () {
			switch (format) {
				case 0:
					return _Utils_Tuple2(8, 6);
				case 1:
					return _Utils_Tuple2(8, 2);
				case 2:
					return _Utils_Tuple2(16, 0);
				default:
					return _Utils_Tuple2(8, 0);
			}
		}();
		var depth = _v1.a;
		var color = _v1.b;
		return $elm$bytes$Bytes$Encode$sequence(
			_List_fromArray(
				[
					A2($elm$bytes$Bytes$Encode$unsignedInt32, 1, width),
					A2($elm$bytes$Bytes$Encode$unsignedInt32, 1, height),
					$elm$bytes$Bytes$Encode$unsignedInt8(depth),
					$elm$bytes$Bytes$Encode$unsignedInt8(color),
					$elm$bytes$Bytes$Encode$unsignedInt8(0),
					$elm$bytes$Bytes$Encode$unsignedInt8(0),
					$elm$bytes$Bytes$Encode$unsignedInt8(interlace)
				]));
	});
var $justgook$elm_image$Image$Internal$PNG$encodeSignature = $elm$bytes$Bytes$Encode$sequence(
	_List_fromArray(
		[
			$elm$bytes$Bytes$Encode$unsignedInt8(137),
			$elm$bytes$Bytes$Encode$unsignedInt8(80),
			$elm$bytes$Bytes$Encode$unsignedInt8(78),
			$elm$bytes$Bytes$Encode$unsignedInt8(71),
			$elm$bytes$Bytes$Encode$unsignedInt8(13),
			$elm$bytes$Bytes$Encode$unsignedInt8(10),
			$elm$bytes$Bytes$Encode$unsignedInt8(26),
			$elm$bytes$Bytes$Encode$unsignedInt8(10)
		]));
var $justgook$elm_image$Image$Info$dimensions = function (meta) {
	switch (meta.$) {
		case 0:
			var width = meta.a.bL;
			var height = meta.a.a1;
			return {a1: height, bL: width};
		case 1:
			var width = meta.a.bL;
			var height = meta.a.a1;
			return {a1: height, bL: width};
		case 2:
			var width = meta.a.bL;
			var height = meta.a.a1;
			return {a1: height, bL: width};
		default:
			var width = meta.a.bL;
			var height = meta.a.a1;
			return {a1: height, bL: width};
	}
};
var $justgook$elm_image$Image$Internal$ImageData$splitAt = F2(
	function (index, xs) {
		var len = $elm$core$Array$length(xs);
		var _v0 = _Utils_Tuple2(
			index > 0,
			_Utils_cmp(index, len) < 0);
		if (_v0.a) {
			if (_v0.b) {
				return _Utils_Tuple2(
					A3($elm$core$Array$slice, 0, index, xs),
					A3($elm$core$Array$slice, index, len, xs));
			} else {
				return _Utils_Tuple2(xs, $elm$core$Array$empty);
			}
		} else {
			if (_v0.b) {
				return _Utils_Tuple2($elm$core$Array$empty, xs);
			} else {
				return _Utils_Tuple2($elm$core$Array$empty, $elm$core$Array$empty);
			}
		}
	});
var $justgook$elm_image$Image$Internal$ImageData$fromArray = F3(
	function (w, arr, acc) {
		fromArray:
		while (true) {
			if (_Utils_cmp(
				$elm$core$Array$length(arr),
				w) > 0) {
				var _v0 = A2($justgook$elm_image$Image$Internal$ImageData$splitAt, w, arr);
				var a1 = _v0.a;
				var a2 = _v0.b;
				var $temp$w = w,
					$temp$arr = a2,
					$temp$acc = A2($elm$core$Array$push, a1, acc);
				w = $temp$w;
				arr = $temp$arr;
				acc = $temp$acc;
				continue fromArray;
			} else {
				return A2($elm$core$Array$push, arr, acc);
			}
		}
	});
var $justgook$elm_image$Image$Internal$ImageData$applyIf = F3(
	function (bool, f, a) {
		return bool ? f(a) : a;
	});
var $justgook$elm_image$Image$Internal$Array2D$lastIndex_ = function (arr) {
	return $elm$core$Array$length(arr) - 1;
};
var $justgook$elm_image$Image$Internal$Array2D$lastLength = function (arr) {
	return A2(
		$elm$core$Maybe$withDefault,
		0,
		A2(
			$elm$core$Maybe$map,
			$elm$core$Array$length,
			A2(
				$elm$core$Array$get,
				$justgook$elm_image$Image$Internal$Array2D$lastIndex_(arr),
				arr)));
};
var $justgook$elm_image$Image$Internal$Array2D$push = F2(
	function (item, arr) {
		return A2(
			$elm$core$Maybe$withDefault,
			arr,
			A2(
				$elm$core$Maybe$map,
				function (arr2) {
					return A3(
						$elm$core$Array$set,
						$justgook$elm_image$Image$Internal$Array2D$lastIndex_(arr),
						A2($elm$core$Array$push, item, arr2),
						arr);
				},
				A2(
					$elm$core$Array$get,
					$justgook$elm_image$Image$Internal$Array2D$lastIndex_(arr),
					arr)));
	});
var $justgook$elm_image$Image$Internal$ImageData$fromList = F3(
	function (w, l, acc) {
		fromList:
		while (true) {
			if (l.b) {
				var a = l.a;
				var rest = l.b;
				var newAcc = A3(
					$justgook$elm_image$Image$Internal$ImageData$applyIf,
					_Utils_cmp(
						$justgook$elm_image$Image$Internal$Array2D$lastLength(acc),
						w) > -1,
					$elm$core$Array$push($elm$core$Array$empty),
					acc);
				var $temp$w = w,
					$temp$l = rest,
					$temp$acc = A2($justgook$elm_image$Image$Internal$Array2D$push, a, newAcc);
				w = $temp$w;
				l = $temp$l;
				acc = $temp$acc;
				continue fromList;
			} else {
				return acc;
			}
		}
	});
var $justgook$elm_image$Image$Internal$ImageData$toArray2d = function (image) {
	toArray2d:
	while (true) {
		switch (image.$) {
			case 0:
				var meta = image.a;
				var l = image.b;
				return A3(
					$justgook$elm_image$Image$Internal$ImageData$fromList,
					$justgook$elm_image$Image$Info$dimensions(meta).bL,
					l,
					$elm$core$Array$fromList(
						_List_fromArray(
							[$elm$core$Array$empty])));
			case 1:
				var l = image.b;
				return A3(
					$elm$core$List$foldl,
					A2($elm$core$Basics$composeR, $elm$core$Array$fromList, $elm$core$Array$push),
					$elm$core$Array$empty,
					l);
			case 2:
				var meta = image.a;
				var arr = image.b;
				return A3(
					$justgook$elm_image$Image$Internal$ImageData$fromArray,
					$justgook$elm_image$Image$Info$dimensions(meta).bL,
					arr,
					$elm$core$Array$empty);
			case 3:
				var arr = image.b;
				return arr;
			default:
				var d = image.b;
				var b = image.c;
				var _v1 = A2($elm$bytes$Bytes$Decode$decode, d, b);
				if (!_v1.$) {
					if (_v1.a.$ === 4) {
						var _v2 = _v1.a;
						return $elm$core$Array$empty;
					} else {
						var newData = _v1.a;
						var $temp$image = newData;
						image = $temp$image;
						continue toArray2d;
					}
				} else {
					return $elm$core$Array$empty;
				}
		}
	}
};
var $justgook$elm_image$Image$Internal$PNG$encode = function (imgData) {
	var opt = $justgook$elm_image$Image$Internal$ImageData$defaultOptions;
	var chunkIEND = A2(
		$justgook$elm_image$Image$Internal$PNG$encodeChunk,
		1229278788,
		$elm$bytes$Bytes$Encode$encode(
			$elm$bytes$Bytes$Encode$sequence(_List_Nil)));
	var arr = $justgook$elm_image$Image$Internal$ImageData$toArray2d(imgData);
	var chunkIDAT = A2(
		$justgook$elm_image$Image$Internal$PNG$encodeChunk,
		1229209940,
		$elm$bytes$Bytes$Encode$encode(
			A2($justgook$elm_image$Image$Internal$PNG$encodeIDAT, opt, arr)));
	var height = $elm$core$Array$length(arr);
	var width = A2(
		$elm$core$Maybe$withDefault,
		0,
		A2(
			$elm$core$Maybe$map,
			$elm$core$Array$length,
			A2($elm$core$Array$get, 0, arr)));
	var chunkIHDR = A2(
		$justgook$elm_image$Image$Internal$PNG$encodeChunk,
		1229472850,
		$elm$bytes$Bytes$Encode$encode(
			A3($justgook$elm_image$Image$Internal$PNG$encodeIHDR, width, height, opt)));
	return $elm$bytes$Bytes$Encode$encode(
		$elm$bytes$Bytes$Encode$sequence(
			_List_fromArray(
				[$justgook$elm_image$Image$Internal$PNG$encodeSignature, chunkIHDR, chunkIDAT, chunkIEND])));
};
var $justgook$elm_image$Image$Internal$ImageData$Array2d = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var $justgook$elm_image$Image$Internal$ImageData$Bytes = F3(
	function (a, b, c) {
		return {$: 4, a: a, b: b, c: c};
	});
var $justgook$elm_image$Image$Internal$ImageData$List = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var $justgook$elm_image$Image$Internal$ImageData$List2d = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var $justgook$elm_image$Image$Internal$ImageData$map = F2(
	function (fn, image) {
		map:
		while (true) {
			switch (image.$) {
				case 0:
					var meta = image.a;
					var l = image.b;
					return A2(
						$justgook$elm_image$Image$Internal$ImageData$List,
						meta,
						A2($elm$core$List$map, fn, l));
				case 1:
					var meta = image.a;
					var l = image.b;
					return A2(
						$justgook$elm_image$Image$Internal$ImageData$List2d,
						meta,
						A2(
							$elm$core$List$map,
							$elm$core$List$map(fn),
							l));
				case 2:
					var meta = image.a;
					var arr = image.b;
					return A2(
						$justgook$elm_image$Image$Internal$ImageData$Array,
						meta,
						A2($elm$core$Array$map, fn, arr));
				case 3:
					var meta = image.a;
					var arr = image.b;
					return A2(
						$justgook$elm_image$Image$Internal$ImageData$Array2d,
						meta,
						A2(
							$elm$core$Array$map,
							$elm$core$Array$map(fn),
							arr));
				default:
					var meta = image.a;
					var d = image.b;
					var b = image.c;
					var _v1 = A2($elm$bytes$Bytes$Decode$decode, d, b);
					if (!_v1.$) {
						if (_v1.a.$ === 4) {
							var _v2 = _v1.a;
							return A3($justgook$elm_image$Image$Internal$ImageData$Bytes, meta, d, b);
						} else {
							var newData = _v1.a;
							var $temp$fn = fn,
								$temp$image = newData;
							fn = $temp$fn;
							image = $temp$image;
							continue map;
						}
					} else {
						return A3($justgook$elm_image$Image$Internal$ImageData$Bytes, meta, d, b);
					}
			}
		}
	});
var $justgook$elm_image$Image$Internal$Pixel$addChannel = $justgook$elm_image$Image$Internal$ImageData$map(
	A2(
		$elm$core$Basics$composeR,
		$elm$core$Bitwise$shiftLeftBy(8),
		$elm$core$Basics$add(255)));
var $justgook$elm_image$Image$Internal$ImageData$getInfo = function (image) {
	switch (image.$) {
		case 4:
			var meta = image.a;
			return meta;
		case 3:
			var meta = image.a;
			return meta;
		case 1:
			var meta = image.a;
			return meta;
		case 2:
			var meta = image.a;
			return meta;
		default:
			var meta = image.a;
			return meta;
	}
};
var $justgook$elm_image$Image$Internal$Pixel$px8AlphaTo32 = function (px_) {
	var px = px_ >>> 8;
	return (255 & px_) + ((px + ((px + ((px + (px << 8)) << 8)) << 8)) << 8);
};
var $justgook$elm_image$Image$Internal$Pixel$px8to32 = function (px) {
	return 255 + ((px + ((px + ((px + (px << 8)) << 8)) << 8)) << 8);
};
var $justgook$elm_image$Image$Internal$Pixel$toBit32 = function (image) {
	var _v0 = $justgook$elm_image$Image$Internal$ImageData$getInfo(image);
	switch (_v0.$) {
		case 0:
			var color = _v0.a.ab;
			switch (color.$) {
				case 0:
					return image;
				case 2:
					return image;
				case 4:
					return image;
				case 1:
					return A2($justgook$elm_image$Image$Internal$ImageData$map, $justgook$elm_image$Image$Internal$Pixel$px8AlphaTo32, image);
				default:
					return image;
			}
		case 1:
			var bitsPerPixel = _v0.a.bQ;
			switch (bitsPerPixel) {
				case 0:
					return A2($justgook$elm_image$Image$Internal$ImageData$map, $justgook$elm_image$Image$Internal$Pixel$px8to32, image);
				case 1:
					return image;
				case 2:
					return $justgook$elm_image$Image$Internal$Pixel$addChannel(image);
				default:
					return image;
			}
		case 2:
			return image;
		default:
			var color = _v0.a.ab;
			switch (color.$) {
				case 0:
					return image;
				case 1:
					return image;
				case 2:
					return image;
				default:
					return image;
			}
	}
};
var $justgook$elm_image$Image$Advanced$toPng32 = A2($elm$core$Basics$composeR, $justgook$elm_image$Image$Internal$Pixel$toBit32, $justgook$elm_image$Image$Internal$PNG$encode);
var $justgook$elm_image$Image$toPngUrl = A2(
	$elm$core$Basics$composeR,
	$justgook$elm_image$Image$Advanced$toPng32,
	A2(
		$elm$core$Basics$composeR,
		$danfishgold$base64_bytes$Base64$fromBytes,
		A2(
			$elm$core$Basics$composeR,
			$elm$core$Maybe$withDefault(''),
			$elm$core$Basics$append('data:image/png;base64,'))));
var $author$project$Main$weakClassify = F4(
	function (cascade, stageIdx, classifierIdx, image) {
		return A2(
			$elm$core$Maybe$map,
			function (classifier) {
				var pixelFeatureFactors = A3(
					$elm$core$List$foldl,
					F2(
						function (cell, pixels) {
							var magnification = (image.aG.bL / cascade.aG.bL) | 0;
							var top = cell.cN.cs.db * magnification;
							var left = cell.cN.cs.da * magnification;
							var right = left + (cell.cN.aG.bL * magnification);
							var bottom = top + (cell.cN.aG.a1 * magnification);
							return A2(
								$elm$core$Array$indexedMap,
								F2(
									function (idx, px) {
										var row = (idx / image.aG.bL) | 0;
										var col = A2($elm$core$Basics$modBy, image.aG.bL, idx);
										return ((_Utils_cmp(col, left) > -1) && ((_Utils_cmp(col, right) < 0) && ((_Utils_cmp(row, top) > -1) && (_Utils_cmp(row, bottom) < 0)))) ? $elm$core$Basics$round(px + cell.cc) : px;
									}),
								pixels);
						}),
					A2($elm$core$Array$repeat, image.aG.bL * image.aG.a1, 0),
					classifier.cd.bW);
				var pixelFeatureValues = A2(
					$elm$core$Array$indexedMap,
					F2(
						function (idx, px) {
							return (px + 1) * A2(
								$elm$core$Maybe$withDefault,
								0,
								A2($elm$core$Array$get, idx, pixelFeatureFactors));
						}),
					image.b3);
				var featureValue = (A3($elm$core$Array$foldl, $elm$core$Basics$add, 0, pixelFeatureValues) / $elm$core$Array$length(pixelFeatureValues)) / 255.0;
				return {
					ce: $justgook$elm_image$Image$toPngUrl(
						$author$project$Main$featureExtractionImage(
							{b3: pixelFeatureValues, aG: image.aG})),
					cX: _Utils_cmp(featureValue, classifier.bJ) > -1,
					c5: featureValue
				};
			},
			A2(
				$elm$core$Maybe$andThen,
				A2(
					$elm$core$Basics$composeL,
					$elm$core$Array$get(classifierIdx),
					function ($) {
						return $.c7;
					}),
				A2($elm$core$Array$get, stageIdx, cascade.bG)));
	});
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 0:
				var files = msg.a;
				return _Utils_Tuple2(
					model,
					function () {
						if (files.b) {
							var file = files.a;
							return A2(
								$elm$core$Task$perform,
								$author$project$Common$CascadeXml,
								$elm$file$File$toString(file));
						} else {
							return $elm$core$Platform$Cmd$none;
						}
					}());
			case 1:
				var cascadeXml = msg.a;
				return _Utils_Tuple2(
					model,
					$author$project$Main$parseXmlCmd(cascadeXml));
			case 2:
				var cascadeRes = msg.a;
				return _Utils_Tuple2(
					function () {
						if (!cascadeRes.$) {
							var cascade = cascadeRes.a;
							return _Utils_update(
								model,
								{bU: cascade, cu: $elm$core$Maybe$Nothing, cw: $elm$core$Maybe$Nothing});
						} else {
							var err = cascadeRes.a;
							return _Utils_update(
								model,
								{
									cw: $elm$core$Maybe$Just('Failed to parse XML: ' + err)
								});
						}
					}(),
					$elm$core$Platform$Cmd$none);
			case 3:
				var files = msg.a;
				return _Utils_Tuple2(
					model,
					function () {
						if (files.b) {
							var file = files.a;
							return A2(
								$elm$core$Task$perform,
								$author$project$Common$ImageDataUrl,
								$elm$file$File$toUrl(file));
						} else {
							return $elm$core$Platform$Cmd$none;
						}
					}());
			case 4:
				var url = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cl: {cx: $elm$core$Maybe$Nothing, c4: url}
						}),
					$author$project$Main$getImagePixelsCmd(
						{af: $author$project$Common$imageLongEdgePx, c4: url}));
			case 5:
				var pixels = msg.a;
				var image = model.cl;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cl: _Utils_update(
								image,
								{
									cx: $elm$core$Maybe$Just(pixels)
								})
						}),
					$elm$core$Platform$Cmd$none);
			case 6:
				var imageSize = msg.a;
				var event = msg.b;
				return _Utils_Tuple2(
					function () {
						var magnification = model.cO / imageSize.bL;
						var cascadeWidth = model.bU.aG.bL;
						var cascadeHeight = model.bU.aG.a1;
						var _v4 = event.cB;
						var offsetX = _v4.a;
						var offsetY = _v4.b;
						var candidateX = offsetX / magnification;
						var toRight = imageSize.bL - candidateX;
						var candidateY = offsetY / magnification;
						var toBottom = imageSize.a1 - candidateY;
						var maxSize = (_Utils_cmp(toRight / cascadeWidth, toBottom / cascadeHeight) > 0) ? {
							a1: $elm$core$Basics$round(toBottom),
							bL: $elm$core$Basics$round((toBottom * cascadeWidth) / cascadeHeight)
						} : {
							a1: $elm$core$Basics$round((toRight * cascadeHeight) / cascadeWidth),
							bL: $elm$core$Basics$round(toRight)
						};
						var _v5 = event.aP;
						var clientX = _v5.a;
						var clientY = _v5.b;
						return _Utils_update(
							model,
							{
								cu: $elm$core$Maybe$Just(
									{
										bT: {
											cs: {
												da: $elm$core$Basics$round(candidateX),
												db: $elm$core$Basics$round(candidateY)
											},
											aG: model.bU.aG
										},
										cv: $elm$core$Maybe$Just(
											{
												ct: maxSize,
												cy: model.bU.aG,
												cU: {
													da: $elm$core$Basics$round(clientX),
													db: $elm$core$Basics$round(clientY)
												}
											}),
										bG: $elm$core$Array$empty,
										cV: $author$project$Common$Initializing
									})
							});
					}(),
					$elm$core$Platform$Cmd$none);
			case 7:
				var imageSize = msg.a;
				var dragState = msg.b;
				var event = msg.c;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cu: A2(
								$elm$core$Maybe$map,
								function (detection) {
									var minWidth = dragState.cy.bL;
									var minHeight = dragState.cy.a1;
									var maxWidth = dragState.ct.bL;
									var maxHeight = dragState.ct.a1;
									var magnification = model.cO / imageSize.bL;
									var cascadeWidth = model.bU.aG.bL;
									var cascadeHeight = model.bU.aG.a1;
									var area = detection.bT;
									var _v6 = event.aP;
									var clientX = _v6.a;
									var clientY = _v6.b;
									var distXUnrounded = (clientX - dragState.cU.da) / magnification;
									var distX = $elm$core$Basics$round(distXUnrounded / cascadeWidth) * cascadeWidth;
									var distYUnrounded = (clientY - dragState.cU.db) / magnification;
									var distY = $elm$core$Basics$round(distYUnrounded / cascadeHeight) * cascadeHeight;
									var size = ((_Utils_cmp(distX, minWidth) < 0) || (_Utils_cmp(distY, minHeight) < 0)) ? dragState.cy : (((_Utils_cmp(distX, maxWidth) > 0) || (_Utils_cmp(distY, maxHeight) > 0)) ? dragState.ct : ((_Utils_cmp(distX / cascadeWidth, distY / cascadeHeight) > 0) ? {
										a1: $elm$core$Basics$round((distX * cascadeHeight) / cascadeWidth),
										bL: $elm$core$Basics$round(distX)
									} : {
										a1: $elm$core$Basics$round(distY),
										bL: $elm$core$Basics$round((distY * cascadeWidth) / cascadeHeight)
									}));
									return _Utils_update(
										detection,
										{
											bT: _Utils_update(
												area,
												{aG: size})
										});
								},
								model.cu)
						}),
					$elm$core$Platform$Cmd$none);
			case 8:
				var imagePixels = msg.a;
				var detection = msg.b;
				var area = detection.bT;
				var areaGsPixelData = A3(
					$elm$core$List$foldr,
					$elm$core$Array$append,
					$elm$core$Array$empty,
					A2(
						$elm$core$List$map,
						function (row) {
							var start = (row * imagePixels.aG.bL) + area.cs.da;
							var end = start + area.aG.bL;
							return A3($elm$core$Array$slice, start, end, imagePixels.b3);
						},
						A2($elm$core$List$range, area.cs.db, (area.cs.db + area.aG.a1) - 1)));
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							cu: $elm$core$Maybe$Just(
								_Utils_update(
									detection,
									{
										cv: $elm$core$Maybe$Nothing,
										bG: $elm$core$Array$empty,
										cV: A3(
											$author$project$Common$Running,
											-1,
											-1,
											{b3: areaGsPixelData, aG: area.aG})
									}))
						}),
					$elm$core$Platform$Cmd$none);
			case 9:
				var _v7 = A2(
					$elm$core$Maybe$map,
					function (d) {
						return _Utils_Tuple2(d, d.cV);
					},
					model.cu);
				if ((!_v7.$) && (_v7.a.b.$ === 1)) {
					var _v8 = _v7.a;
					var detection = _v8.a;
					var _v9 = _v8.b;
					var lastStageIdx = _v9.a;
					var lastClassifierIdx = _v9.b;
					var image = _v9.c;
					var _v10 = A4($author$project$Main$weakClassify, model.bU, lastStageIdx, lastClassifierIdx + 1, image);
					if (!_v10.$) {
						var weakClassification = _v10.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									cu: $elm$core$Maybe$Just(
										_Utils_update(
											detection,
											{
												bG: function () {
													var _v11 = A2($elm$core$Array$get, lastStageIdx, detection.bG);
													if (!_v11.$) {
														var weakClassifications = _v11.a;
														return A3(
															$elm$core$Array$set,
															lastStageIdx,
															A2($elm$core$Array$push, weakClassification, weakClassifications),
															detection.bG);
													} else {
														return detection.bG;
													}
												}(),
												cV: (!weakClassification.cX) ? $author$project$Common$Failed : A3($author$project$Common$Running, lastStageIdx, lastClassifierIdx + 1, image)
											}))
								}),
							$author$project$Main$scrollToClassification(
								'stage' + ($elm$core$String$fromInt(lastStageIdx) + ('-classifier' + $elm$core$String$fromInt(lastClassifierIdx + 1)))));
					} else {
						var _v12 = A4($author$project$Main$weakClassify, model.bU, lastStageIdx + 1, 0, image);
						if (!_v12.$) {
							var weakClassification = _v12.a;
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										cu: $elm$core$Maybe$Just(
											_Utils_update(
												detection,
												{
													bG: A2(
														$elm$core$Array$push,
														$elm$core$Array$fromList(
															_List_fromArray(
																[weakClassification])),
														detection.bG),
													cV: (!weakClassification.cX) ? $author$project$Common$Failed : A3($author$project$Common$Running, lastStageIdx + 1, 0, image)
												}))
									}),
								$author$project$Main$scrollToClassification(
									'stage' + ($elm$core$String$fromInt(lastStageIdx + 1) + '-classifier0')));
						} else {
							return _Utils_Tuple2(
								_Utils_update(
									model,
									{
										cu: $elm$core$Maybe$Just(
											_Utils_update(
												detection,
												{cV: $author$project$Common$Succeeded}))
									}),
								$elm$core$Platform$Cmd$none);
						}
					}
				} else {
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				}
			case 10:
				var widthPx = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cO: widthPx - model.cF}),
					$author$project$Main$getImagePixelsCmd(
						{af: $author$project$Common$imageLongEdgePx, c4: model.cl.c4}));
			case 11:
				if (!msg.a.$) {
					var image = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								cF: $elm$core$Basics$round(image.aK.bL - image.at.bL),
								cO: $elm$core$Basics$round(image.at.bL)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					return _Utils_Tuple2(
						model,
						A2(
							$elm$core$Task$perform,
							A2(
								$elm$core$Basics$composeL,
								A2(
									$elm$core$Basics$composeL,
									A2($elm$core$Basics$composeL, $author$project$Common$WindowWidthPx, $elm$core$Basics$round),
									function ($) {
										return $.bL;
									}),
								function ($) {
									return $.aK;
								}),
							$elm$browser$Browser$Dom$getViewport));
				}
			default:
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Common$CascadeFiles = function (a) {
	return {$: 0, a: a};
};
var $author$project$Common$CreateCandidateResize = F3(
	function (a, b, c) {
		return {$: 7, a: a, b: b, c: c};
	});
var $author$project$Common$CreateCandidateStart = F2(
	function (a, b) {
		return {$: 6, a: a, b: b};
	});
var $author$project$Common$CreateCandidateStop = F2(
	function (a, b) {
		return {$: 8, a: a, b: b};
	});
var $author$project$Common$ImageFiles = function (a) {
	return {$: 3, a: a};
};
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$accept = $elm$html$Html$Attributes$stringProperty('accept');
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$img = _VirtualDom_node('img');
var $elm$html$Html$Attributes$src = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var $author$project$View$detectionCandidateImgView = F2(
	function (imageGrayscalePixels, area) {
		var areaGsPixelData = A3(
			$elm$core$List$foldr,
			$elm$core$Array$append,
			$elm$core$Array$empty,
			A2(
				$elm$core$List$map,
				function (row) {
					var start = (row * imageGrayscalePixels.aG.bL) + area.cs.da;
					var end = start + area.aG.bL;
					return A3($elm$core$Array$slice, start, end, imageGrayscalePixels.b3);
				},
				A2($elm$core$List$range, area.cs.db, (area.cs.db + area.aG.a1) - 1)));
		var areaRgbaPixelData = A2(
			$elm$core$Array$map,
			function (px) {
				return (((px << 24) + (px << 16)) + (px << 8)) + 255;
			},
			areaGsPixelData);
		return A2(
			$elm$html$Html$img,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$src(
					$justgook$elm_image$Image$toPngUrl(
						A2($justgook$elm_image$Image$fromArray, area.aG.bL, areaRgbaPixelData)))
				]),
			_List_Nil);
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$file$File$decoder = _File_decoder;
var $author$project$View$filesDecoder = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'files']),
	$elm$json$Json$Decode$list($elm$file$File$decoder));
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$multiple = $elm$html$Html$Attributes$boolProperty('multiple');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$defaultOptions = {aC: true, aI: false};
var $elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 3, a: a};
};
var $elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$Event = F6(
	function (keys, button, clientPos, offsetPos, pagePos, screenPos) {
		return {bS: button, aP: clientPos, cq: keys, cB: offsetPos, cG: pagePos, cR: screenPos};
	});
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$BackButton = 4;
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$ErrorButton = 0;
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$ForwardButton = 5;
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$MainButton = 1;
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$MiddleButton = 2;
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$SecondButton = 3;
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonFromId = function (id) {
	switch (id) {
		case 0:
			return 1;
		case 1:
			return 2;
		case 2:
			return 3;
		case 3:
			return 4;
		case 4:
			return 5;
		default:
			return 0;
	}
};
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonDecoder = A2(
	$elm$json$Json$Decode$map,
	$mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonFromId,
	A2($elm$json$Json$Decode$field, 'button', $elm$json$Json$Decode$int));
var $mpizenberg$elm_pointer_events$Internal$Decode$clientPos = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2($elm$json$Json$Decode$field, 'clientX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'clientY', $elm$json$Json$Decode$float));
var $mpizenberg$elm_pointer_events$Internal$Decode$Keys = F3(
	function (alt, ctrl, shift) {
		return {bO: alt, b2: ctrl, cS: shift};
	});
var $mpizenberg$elm_pointer_events$Internal$Decode$keys = A4(
	$elm$json$Json$Decode$map3,
	$mpizenberg$elm_pointer_events$Internal$Decode$Keys,
	A2($elm$json$Json$Decode$field, 'altKey', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'ctrlKey', $elm$json$Json$Decode$bool),
	A2($elm$json$Json$Decode$field, 'shiftKey', $elm$json$Json$Decode$bool));
var $elm$json$Json$Decode$map6 = _Json_map6;
var $mpizenberg$elm_pointer_events$Internal$Decode$offsetPos = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2($elm$json$Json$Decode$field, 'offsetX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'offsetY', $elm$json$Json$Decode$float));
var $mpizenberg$elm_pointer_events$Internal$Decode$pagePos = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$float));
var $mpizenberg$elm_pointer_events$Internal$Decode$screenPos = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (a, b) {
			return _Utils_Tuple2(a, b);
		}),
	A2($elm$json$Json$Decode$field, 'screenX', $elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'screenY', $elm$json$Json$Decode$float));
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$eventDecoder = A7($elm$json$Json$Decode$map6, $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$Event, $mpizenberg$elm_pointer_events$Internal$Decode$keys, $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$buttonDecoder, $mpizenberg$elm_pointer_events$Internal$Decode$clientPos, $mpizenberg$elm_pointer_events$Internal$Decode$offsetPos, $mpizenberg$elm_pointer_events$Internal$Decode$pagePos, $mpizenberg$elm_pointer_events$Internal$Decode$screenPos);
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onWithOptions = F3(
	function (event, options, tag) {
		return A2(
			$elm$html$Html$Events$custom,
			event,
			A2(
				$elm$json$Json$Decode$map,
				function (ev) {
					return {
						C: tag(ev),
						aC: options.aC,
						aI: options.aI
					};
				},
				$mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$eventDecoder));
	});
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onDown = A2($mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onWithOptions, 'mousedown', $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$defaultOptions);
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onLeave = A2($mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onWithOptions, 'mouseleave', $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$defaultOptions);
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onMove = A2($mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onWithOptions, 'mousemove', $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$defaultOptions);
var $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onUp = A2($mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onWithOptions, 'mouseup', $mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$defaultOptions);
var $elm$html$Html$pre = _VirtualDom_node('pre');
var $elm$html$Html$h4 = _VirtualDom_node('h4');
var $elm$html$Html$hr = _VirtualDom_node('hr');
var $elm$html$Html$ol = _VirtualDom_node('ol');
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$br = _VirtualDom_node('br');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $author$project$View$featureView = F2(
	function (cascadeSize, feature) {
		var widthPx = 120;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('feature'),
					A2(
					$elm$html$Html$Attributes$style,
					'width',
					$elm$core$String$fromFloat(widthPx) + 'px'),
					A2(
					$elm$html$Html$Attributes$style,
					'height',
					$elm$core$String$fromFloat((cascadeSize.a1 / cascadeSize.bL) * widthPx) + 'px')
				]),
			A2(
				$elm$core$List$map,
				function (cell) {
					var y = cell.cN.cs.db;
					var x = cell.cN.cs.da;
					var w = cell.cN.aG.bL;
					var h = cell.cN.aG.a1;
					var factor = cell.cc;
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('rect'),
								A2(
								$elm$html$Html$Attributes$style,
								'left',
								$elm$core$String$fromFloat((x / cascadeSize.bL) * 100) + '%'),
								A2(
								$elm$html$Html$Attributes$style,
								'top',
								$elm$core$String$fromFloat((y / cascadeSize.a1) * 100) + '%'),
								A2(
								$elm$html$Html$Attributes$style,
								'width',
								$elm$core$String$fromFloat((w / cascadeSize.bL) * 100) + '%'),
								A2(
								$elm$html$Html$Attributes$style,
								'height',
								$elm$core$String$fromFloat((h / cascadeSize.a1) * 100) + '%'),
								A2(
								$elm$html$Html$Attributes$style,
								'transform',
								feature.c0 ? 'rotate(45deg)' : 'none'),
								A2(
								$elm$html$Html$Attributes$style,
								'background-color',
								_Utils_eq(factor, -1.0) ? '#000' : ((factor === 2.0) ? '#CCC' : ((factor === 3.0) ? '#DDD' : '#FFF')))
							]),
						(_Utils_eq(factor, -1.0) || ((factor === 2.0) || (factor === 3.0))) ? _List_Nil : _List_fromArray(
							[
								$elm$html$Html$text(
								$elm$core$String$fromFloat(factor))
							]));
				},
				feature.bW));
	});
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		$elm$core$String$fromInt(n));
};
var $author$project$View$weakClassifierView = F6(
	function (cascadeSize, maybeDetectionStatus, maybeClassification, stageIdx, classifierIdx, classifier) {
		return A2(
			$elm$html$Html$li,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$id(
					'stage' + ($elm$core$String$fromInt(stageIdx) + ('-classifier' + $elm$core$String$fromInt(classifierIdx)))),
				A2(
					$elm$core$List$cons,
					$elm$html$Html$Attributes$class('classifier'),
					function () {
						if ((!maybeDetectionStatus.$) && (maybeDetectionStatus.a.$ === 1)) {
							var _v1 = maybeDetectionStatus.a;
							var runningStageIdx = _v1.a;
							return (!_Utils_eq(stageIdx, runningStageIdx)) ? _List_Nil : _List_fromArray(
								[
									$elm$html$Html$Attributes$class('running')
								]);
						} else {
							return _List_Nil;
						}
					}())),
			function () {
				if (!maybeClassification.$) {
					var classification = maybeClassification.a;
					return _List_fromArray(
						[
							$elm$html$Html$text('Value: '),
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class(
									(_Utils_cmp(classification.c5, classifier.bJ) > -1) ? 'positive' : 'negative'),
									$elm$html$Html$Attributes$title(
									'Threshold: ' + $elm$core$String$fromFloat(classifier.bJ))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$elm$core$String$fromFloat(classification.c5))
								])),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2(
							$elm$html$Html$img,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$width(120),
									A2($elm$html$Html$Attributes$style, 'border', 'solid black 1px'),
									$elm$html$Html$Attributes$src(classification.ce)
								]),
							_List_Nil)
						]);
				} else {
					return _List_fromArray(
						[
							$elm$html$Html$text(
							'Threshold: ' + $elm$core$String$fromFloat(classifier.bJ)),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($author$project$View$featureView, cascadeSize, classifier.cd)
						]);
				}
			}());
	});
var $author$project$View$stageView = F5(
	function (cascadeSize, maybeDetectionStatus, maybeWeakClassifications, stageIdx, stage) {
		return A2(
			$elm$html$Html$div,
			A2(
				$elm$core$List$cons,
				$elm$html$Html$Attributes$class('stage'),
				function () {
					if ((!maybeDetectionStatus.$) && (maybeDetectionStatus.a.$ === 1)) {
						var _v1 = maybeDetectionStatus.a;
						var runningStageIdx = _v1.a;
						return (!_Utils_eq(stageIdx, runningStageIdx)) ? _List_Nil : _List_fromArray(
							[
								$elm$html$Html$Attributes$class('running')
							]);
					} else {
						return _List_Nil;
					}
				}()),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h4,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(
							'Stage ' + $elm$core$String$fromInt(stageIdx + 1))
						])),
					A2(
					$elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(
							'Threshold: ' + $elm$core$String$fromFloat(stage.bJ))
						])),
					A2(
					$elm$html$Html$ol,
					_List_Nil,
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (classifierIdx, classifier) {
								return A6(
									$author$project$View$weakClassifierView,
									cascadeSize,
									maybeDetectionStatus,
									A2(
										$elm$core$Maybe$andThen,
										$elm$core$Array$get(classifierIdx),
										maybeWeakClassifications),
									stageIdx,
									classifierIdx,
									classifier);
							}),
						$elm$core$Array$toList(stage.c7))),
					A2($elm$html$Html$hr, _List_Nil, _List_Nil)
				]));
	});
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $author$project$View$view = function (model) {
	return A2(
		$elm$html$Html$div,
		function () {
			var _v0 = _Utils_Tuple3(
				model.cl.cx,
				model.cu,
				A2(
					$elm$core$Maybe$andThen,
					function ($) {
						return $.cv;
					},
					model.cu));
			if (((!_v0.a.$) && (!_v0.b.$)) && (!_v0.c.$)) {
				var pixels = _v0.a.a;
				var detection = _v0.b.a;
				var dragState = _v0.c.a;
				return _List_fromArray(
					[
						$mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onMove(
						A2($author$project$Common$CreateCandidateResize, pixels.aG, dragState)),
						$mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onUp(
						$elm$core$Basics$always(
							A2($author$project$Common$CreateCandidateStop, pixels, detection))),
						$mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onLeave(
						$elm$core$Basics$always(
							A2($author$project$Common$CreateCandidateStop, pixels, detection)))
					]);
			} else {
				return _List_Nil;
			}
		}(),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('image-column'),
						A2(
						$elm$html$Html$Attributes$style,
						'right',
						$elm$core$String$fromInt($author$project$Common$modelColumnWidthPx) + 'px')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$for('image-file')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Image:')
									])),
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$id('image-file'),
										$elm$html$Html$Attributes$type_('file'),
										$elm$html$Html$Attributes$accept('image/*'),
										$elm$html$Html$Attributes$multiple(false),
										A2(
										$elm$html$Html$Events$on,
										'change',
										A2($elm$json$Json$Decode$map, $author$project$Common$ImageFiles, $author$project$View$filesDecoder))
									]),
								_List_Nil)
							])),
						A2(
						$elm$html$Html$div,
						A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$id('image-container'),
							function () {
								var _v1 = model.cl.cx;
								if (!_v1.$) {
									var pixels = _v1.a;
									return _List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'cursor', 'crosshair'),
											$mpizenberg$elm_pointer_events$Html$Events$Extra$Mouse$onDown(
											$author$project$Common$CreateCandidateStart(pixels.aG))
										]);
								} else {
									return _List_Nil;
								}
							}()),
						A2(
							$elm$core$List$cons,
							A2(
								$elm$html$Html$img,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$id('image'),
										$elm$html$Html$Attributes$src(model.cl.c4),
										A2($elm$html$Html$Attributes$style, 'width', '100%')
									]),
								_List_Nil),
							function () {
								var _v2 = _Utils_Tuple2(model.cl.cx, model.cu);
								if ((!_v2.a.$) && (!_v2.b.$)) {
									var pixels = _v2.a.a;
									var detection = _v2.b.a;
									return _List_fromArray(
										[
											A2(
											$elm$html$Html$div,
											function () {
												var magnification = model.cO / pixels.aG.bL;
												var area = detection.bT;
												var height = area.aG.a1 * magnification;
												var left = area.cs.da * magnification;
												var top = area.cs.db * magnification;
												var width = area.aG.bL * magnification;
												return _List_fromArray(
													[
														$elm$html$Html$Attributes$id('detection-candidate'),
														A2(
														$elm$html$Html$Attributes$style,
														'left',
														$elm$core$String$fromFloat(left) + 'px'),
														A2(
														$elm$html$Html$Attributes$style,
														'top',
														$elm$core$String$fromFloat(top) + 'px'),
														A2(
														$elm$html$Html$Attributes$style,
														'width',
														$elm$core$String$fromFloat(
															A2($elm$core$Basics$max, 0, width - 4)) + 'px'),
														A2(
														$elm$html$Html$Attributes$style,
														'height',
														$elm$core$String$fromFloat(
															A2($elm$core$Basics$max, 0, height - 4)) + 'px')
													]);
											}(),
											_List_Nil),
											A2($author$project$View$detectionCandidateImgView, pixels, detection.bT)
										]);
								} else {
									return _List_Nil;
								}
							}()))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('model-column'),
						A2(
						$elm$html$Html$Attributes$style,
						'width',
						$elm$core$String$fromInt($author$project$Common$modelColumnWidthPx) + 'px')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$label,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$for('cascade-file')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text('Cascade XML:')
									])),
								A2(
								$elm$html$Html$input,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$id('cascade-file'),
										$elm$html$Html$Attributes$type_('file'),
										$elm$html$Html$Attributes$accept('text/xml'),
										$elm$html$Html$Attributes$multiple(false),
										A2(
										$elm$html$Html$Events$on,
										'change',
										A2($elm$json$Json$Decode$map, $author$project$Common$CascadeFiles, $author$project$View$filesDecoder))
									]),
								_List_Nil)
							])),
						A2(
						$elm$html$Html$pre,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('error')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2($elm$core$Maybe$withDefault, '', model.cw))
							])),
						A2(
						$elm$html$Html$div,
						_List_Nil,
						A2(
							$elm$core$List$cons,
							$elm$html$Html$text(
								'h: ' + ($elm$core$String$fromInt(model.bU.aG.a1) + (', w: ' + $elm$core$String$fromInt(model.bU.aG.bL)))),
							A2(
								$elm$core$List$indexedMap,
								F2(
									function (idx, stage) {
										return A5(
											$author$project$View$stageView,
											model.bU.aG,
											A2(
												$elm$core$Maybe$map,
												function ($) {
													return $.cV;
												},
												model.cu),
											A2(
												$elm$core$Maybe$andThen,
												A2(
													$elm$core$Basics$composeL,
													$elm$core$Array$get(idx),
													function ($) {
														return $.bG;
													}),
												model.cu),
											idx,
											stage);
									}),
								$elm$core$Array$toList(model.bU.bG))))
					]))
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{cn: $author$project$Main$init, cW: $author$project$Main$subscriptions, c3: $author$project$Main$update, c6: $author$project$View$view});
_Platform_export({'Main':{'init':$author$project$Main$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (cascadeJsonValue) {
			return $elm$json$Json$Decode$succeed(
				{bV: cascadeJsonValue});
		},
		A2($elm$json$Json$Decode$field, 'cascadeJsonValue', $elm$json$Json$Decode$value)))(0)}});}(this));