import React, { Component } from 'react';
import { View, Navigator, BackAndroid, Text, Image, TouchableHighlight,Platform } from 'react-native';
import styles from 'css/index'
import page from './page'
import _lodash from 'lodash';
import _SAX from 'fkp-sax';

let _routerInstanc;
let _paths = [];
let _nav;
let route;
let _toast;
let _navigatorSceneConfigs = Navigator.SceneConfigs.FloatFromRight;


let exitCount = 2;
if (Platform.OS==='android'){
    let __toast = _toast || global.Toast;

    BackAndroid.addEventListener('hardwareBackPress', () => {
        if (_nav && _nav.getCurrentRoutes().length > 1) {
            // _nav.pop();
            back()
            return true;
        }
        else {
            if (exitCount>1){
                if (__toast) __toast.show('再按一次退出')
                else {
                    console.log('再按一次退出');
                }
                exitCount--
                _lodash.delay(()=>{
                    exitCount = 2;
                }, 1000)
                return true
            }
            return false;
        }
    });
}

// androidBack(_nav)

export function router(name, intent){
    let instance = _routerInstanc;
    if (instance){
        return instance.distribute(name, intent)
    }
    else {
        return (
            <Navigation name={name} intent={intent}/>
        )
    }
}

router.immediatelyResetRouteStack = function(nextRouteStack){
    if (route){
        route.init(nextRouteStack)
    }
}

router.jumpForward = function(){
    if (_nav){
        _nav.jumpForward()
    }
}

router.jumpBack = function(){
    if (_nav){
        _nav.jumpBack()
    }
}

router.popToTop = function(){
    if (_nav){
        _nav.popToTop()
    }
}

router.getCurrentRoutes = function(){
    if (_nav){
        _nav.getCurrentRoutes()
    }
}

router.jumpTo = function(name, intent){
    if (instance){
        return instance.distribute(name, intent, 'jumpTo')
    }
}

router.replace = function(name, intent){
    if (instance){
        return instance.distribute(name, intent, 'replace')
    }
}
//
router.replacePrevious = function(name, intent){
    if (instance){
        return instance.distribute(name, intent, 'replacePrevious')
    }
}

router.popToRoute = function(name, intent){
    if (instance){
        return instance.distribute(name, intent, 'popToRoute')
    }
}

router.replacePreviousAndPop = function(name, intent){
    if (instance){
        return instance.distribute(name, intent, 'replacePreviousAndPop')
    }
}

router.resetTo = function(name, intent){
    if (instance){
        return instance.distribute(name, intent, 'resetTo')
    }
}

router.replaceAtIndex = function(name, intent){
    console.warn('replaceAtIndex 方法没有集成');
}

function back(intent){
    let instance = _routerInstanc;
    if (instance){
        return instance.goback(intent)
    }
}

class Navigation extends Component {
	constructor(props) {
		super(props);
		this.ids = [];

        _routerInstanc = this;

        this.name = this.props.name;
        this.intent = this.props.intent;
        this.type;

        this.distribute = this.distribute.bind(this);
        this.goback = this.goback.bind(this);
	}


	componentDidMount() {
		this.navigator.navigationContext.addListener('didfocus', e => {
			const { index, id } = e.data.route;
			const haveFocused = this.ids.indexOf(id) > -1;
			this[index] && this[index] && this[index].getWrappedInstance().componentDidFocus && this[index].getWrappedInstance().componentDidFocus(haveFocused);
			!haveFocused && this.ids.push(id);
		});
	}


	renderScene(rt, navigator) {
        if (!_nav || !_nav.refs.scene_0){
            _nav = navigator;
        }

        let me = this;
        if (this.name){
            let _name = this.name;
            this.name = false;
            if (_lodash.findIndex(_paths, {id: _name})>-1){
                return _SAX.setter( _name, (this.intent||{}) )[0];
            }
        }
        else {
            if (rt && rt.id){
                let _name = rt.id;
                if (_lodash.findIndex(_paths, {id: _name})>-1){
                    return _SAX.setter( _name, (this.intent||{}) )[0];
                }
            }
            else {
                return (
                    <View style={styles.listView}>
                        <Text>
                            renderScene
                        </Text>
                    </View>
                )
            }
        }

	}

    configureScene(route) {
		if (route.sceneConfig) {
			return route.sceneConfig
		}
        return _navigatorSceneConfigs;
		// return Navigator.SceneConfigs.FloatFromRight
        // return Navigator.SceneConfigs.FloatFromLeft
        // return Navigator.SceneConfigs.FloatFromBottom
        // return Navigator.SceneConfigs.FloatFromBottomAndroid
        // return Navigator.SceneConfigs.FadeAndroid
        // return Navigator.SceneConfigs.HorizontalSwipeJump
        // return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
        // return Navigator.SceneConfigs.VerticalUpSwipeJump
        // return Navigator.SceneConfigs.VerticalDownSwipeJump
	}

    distribute(name, intent, type){
        this.intent = intent;
        this.type = type;
        // _nav.jumpTo( _lodash.find(_paths, {id: name}) )
        // _nav.push(_lodash.find(_paths, {id: name}))

        switch (type) {
            case 'jumpTo':
                _nav.jumpTo(_lodash.find(_paths, {id: name}))
                break;
            case 'replace':
                _nav.replace(_lodash.find(_paths, {id: name}))
                break;
            case 'replacePrevious':
                _nav.replacePrevious(_lodash.find(_paths, {id: name}))
                break;
            case 'popToRoute':
                _nav.popToRoute(_lodash.find(_paths, {id: name}))
                break;
            case 'replacePreviousAndPop':
                _nav.replacePreviousAndPop(_lodash.find(_paths, {id: name}))
                break;
            case 'resetTo':
                _nav.resetTo(_lodash.find(_paths, {id: name}))
                break;
            default:
                _nav.push(_lodash.find(_paths, {id: name}))
        }
    }

    goback(intent){
        // this.intent = intent
        switch (this.type) {
            case 'jumpTo':
                _nav.jumpBack()
                break;
            case 'jumpForward':
                _nav.jumpBack()
                break;
            case 'popToTop':
                _nav.jumpBack()
                break;
            default:
                _nav.pop()
        }
    }


    // <Image
    // source={{ uri: config.bgImgUri }}
    // style={styles.bg}>
    // <Navigator
    // ref={view => this.navigator=view}
    // initialRoute={initialRoute}
    // configureScene={this.configureScene.bind(this)}
    // renderScene={this.renderScene.bind(this)}/>
    // <Utils/>
    // </Image>
	render() {
        // initialRouteStack = {_paths}
		return (
            <Navigator
                ref={view => this.navigator=view}
                initialRoute={_paths[ (() => _lodash.findIndex(_paths, {id: this.name}))() ]}
                configureScene={this.configureScene.bind(this)}
                renderScene={this.renderScene.bind(this)}/>
		)
	}
}




class _route {
    constructor(){
        this.init = this.init.bind(this);
        this.start = this.start.bind(this);
    }

    configureScene(route){
      return Navigator.SceneConfigs.FadeAndroid;
    }

    router: router

    init(name, opts){
        _paths = [];
        global.Router = router;
        let _firstNode;
        if (_lodash.isObject(name)){
            let keys = Object.keys(name);
            let tmp={};
            keys.map(function(item, i){
                //插入id到body
                let _id = item;
                if (item.indexOf('/')>0) _id = item.replace('/', '_')
                if (i===0){
                    _firstNode = _id
                }


                let page_instence = name[item](_id);
                page_instence.router = router;
                page_instence.back = back;


                if (page_instence.goback || page_instence.trigger || page_instence.end){
                    if (page_instence.goback
                        && _lodash.isFunction(page_instence.goback)){
                        _SAX.set(item, page_instence.goback, [page_instence])
                    }
                    if (page_instence.trigger
                        && _lodash.isFunction(page_instence.trigger)){
                        _SAX.set(item, page_instence.trigger, [page_instence])
                    }

                    if (page_instence.end
                        && _lodash.isFunction(page_instence.end)){
                        page_instence.end.args = [page_instence]
                        tmp[item] = page_instence.end
                        _SAX.set('_CURENT_PAGE', 'none', tmp)
                    }
                }
                else{
                    _SAX.set(item, name[item], [_id])
                }

                _paths.push( {id: _id, index: i} )
            })
            if (opts){
                if (opts.sceneConfig){
                    _navigatorSceneConfigs = opts.sceneConfig;
                }

                if (opts.toast){
                    _toast = opts.toast;
                }
            }
            return this
        }
    }

    start(id, intent){
        return router(id, intent)
    }
}

route = new _route()
export {route, page};
