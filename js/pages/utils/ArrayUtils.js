/**
 * Created by david on 14/4/2017.
 */

export default class ArrayUtils{

    /**
     * 比较两个数组内容是否完全相同
     * @param a
     * @param b
     * @returns {boolean}
     */
    static isAbsEqual(a,b){
        return JSON.stringify(a) == JSON.stringify(b);
    }

    /**
     * 克隆一个数组
     * @param a
     */
    static clone(a){
        return a.map((item)=> {
            var obj = {};
            //for in 遍历对象的属性
            for(var p in item){
                obj[p] = item[p];
            }
            return obj;
        });
    }

    static indexof(array,item){
        let result=-1;
        if(array){
            for(let i=0;i<array.length;i++){
                if(array[i].html_url === item.html_url){
                    result= i;
                }
            }
        }
        return result;
    }
    static favorited(array,i,item){
        if(array){
            for(let i=0;i<array.length;i++){
                if(array[i].html_url === item.html_url){
                    array[i]["favorited"]=item["favorited"]

                }
            }
        }
        return array;
    }
}

/*var a = [
    {name:'Android',checked:true},
    {name:'IOS',checked:false},
    {name:'React Native',checked:true},
    {name:'Java',checked:true},
    {name:'JS',checked:true}
];

var b = [
    {name:'Android',checked:true},
    {name:'IOS',checked:false},
    {name:'React Native',checked:true},
    {name:'Java',checked:true},
    {name:'JS',checked:true}
];

var c = ArrayUtils.clone(a);

a[0].name = "XXXX";
console.log(c);*/

/*
console.log(isAbsEqual(a, b));*/
