import * as Types from '../constants/ActionType';
import {service} from 'example-data/services';
var userData = [];
var arr =[]
const users = (state = userData, action) => {
    var { users ,organ} = action;
    var index = -1;
    var arrTemp=[];
    switch (action.type) {
        case Types.ADD_SERVICE:
            userData=[];
            state.push(users);
            return [...state];
        case Types.FILTER_SERVICE_ORGAN:
            let arrTmp=service.filter(group=>{
               return group.organID===(organ.id+'')
            });
            return [...arrTmp];
        case Types.FETCH_SERVICE:
            var sumTotal = action.totalData;
             arrTemp = new Array(sumTotal);
            arrTemp.fill(0);
            var pageId=action.pageIndex;
            if(pageId===1){
                for (let i = 0; i < action.User.length; i++) {
                    arrTemp[i]=action.User[i];
                } 
                arr=arrTemp; 
                return arrTemp;
            }
            var pageSize = action.pageSize;
            for (var i = 0; i < action.User.length; i++) {
               arr[(pageId-1)*pageSize+i]=action.User[i];
            }
            return arr;
        case Types.FETCH_SERVICE_FILTER:
            var sumData = action.totalData;
            // console.log(sumData+" is total data filter");
             arrTemp = new Array(sumData);
            arrTemp.fill(0);
            if(action.pageIndex===1){
                for (let i = 0; i < action.User.length; i++) {
                    arrTemp[i]=action.User[i];
                }
                userData=arrTemp;
                return userData;
            } 
            for (let i = 0; i < action.User.length; i++) {
                userData[(action.pageIndex-1)*action.pageSize+i]=action.User[i];
                
            }
            //copy productData vao arrTemp sau do gan lai cho productData
            return userData;
        case Types.UPDATE_SERVICE:
            arr=[];
            userData=[];
            index = findIndex(state, users.productId);
            state[index] = users;
            return [...state];
        case Types.DELETE_SERVICE:
            return [...arr];
        case Types.LIST_SERVICES_BY_ORGANID:
            return service.filter((sv=>sv.organID==="1"));
        default: return [...state];
        }
    };
    var findIndex = (products, id) => {
        var result = -1;
        products.forEach((product, index) => {
            if (product.productId === id) {
                result = index;
            }
        });
        return result;
    }
export default users;


