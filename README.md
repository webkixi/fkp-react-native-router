# fkp-react-native-router
react-native router, it from `FKP-REACT-NATIVE`     
抽离自`FKP-REACT-NATIVE`框架  

### Demo comming soon  


## Introduce
有三个部分 `route`, `router`, `page`.  
1. route: define  
2. router: jump to router item  
3. page: receive the intent and do something...

include android back and dblclick exit
包含后退，及双击退出   

## Sample code  
> index.js  

```
import React, { Component } from 'react';
import {route} from 'fkp-react-native-router';  // route

export default class start extends Component {
    render(){
        return (
            route.init( {
                aaa: require('./aaa').default,
                bbb: require('./bbb').default,
                ccc: require('./ccc').default,
            })
            .start('aaa')
        )
    }
}
```  

> aaa.js  

```  
....
....
class Home extends Component {
    render(){
        return (
            <TouchableHighlight
                onPress={() => {
                    Router('bbb', {xxx: 123})
                }}>
            >
                <View>
                    <Text>bbb</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => {
                    Router('ccc', {xxx: 456})
                }}>
            >
                <View>
                    <Text>ccc</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

export default function aaa(id){
    return page.new({
        trigger: function(self, intent){
            console.log(this)    // this === self
            console.log(self)

            console.log(this.router)    // router has some method as Navigator
            console.log(this.back)      //

            console.log(intent)
            return <Home data={intent}/>
        }
    })
}
```  

> bbb.js  

```
....
....


export default function bbb(id){
    return page.new({
        trigger: function(self, intent){             
            console.log(intent)
            return <Other data={intent}/>
        }
    })
}
```

> ccc.js  

```
....
....


export default function ccc(id){
    return page.new({
        trigger: function(self, intent){             
            console.log(intent)
            return <Else data={intent}/>
        }
    })
}
```
