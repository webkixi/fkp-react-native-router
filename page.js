import _lodash from 'lodash';
import _SAX from 'fkp-sax';
/* pages类及pages生周期 */
function pages(opts){

    var page = _SAX.get('_CURENT_PAGE')
    if (page){
        var intent = _SAX.get(page)
        this.intent = intent;
    }
    else {
        this.intent = false;
    }

    var _this = this;

    var _dft = [];
    var defaults = {
        init: function(){},
        // goback: function(){},
        ready: function(){},
        main: function(){}
        // end: function(){}
    }
    _dft = Object.keys(defaults)

    if ( _lodash.isObject(opts) ){
        var defaults = _lodash.extend({}, defaults, opts)
    }

    var dft = defaults;
    var funs = Object.keys(dft)
    funs.map(function(item, i){
        _this[item] = dft[item];
    })

    function run(){
        var _this = this;
        funs.map(function(item, i){
            if (typeof dft[item] === 'function'){
                if (_lodash.indexOf(_dft, item)>-1)
                    dft[item].call(_this, _this, _this.intent)
            }
        })
    }

    _this.next = function(stat,data){
        if (stat){
            if (!_this.innerData){
                _this.innerData = data;
            }
            else{
                var tmp = _lodash.extend({}, _this.innerData, data)
                _this.innerData = tmp;
            }
            run.call(_this)
        }
    }

    if (_lodash.indexOf(funs, 'boot')>-1){
        var stat = dft['boot'].call(_this, _this)
        if (stat)
            run.call(_this);
    }
    else
        run.call(_this);

    return this;
}

pages.new = function(opts){
    return new pages(opts)
}

export default pages
