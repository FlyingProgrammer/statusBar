/*
状态时序图简易实现方式
2020.04.20
zh_tu
*/ 

/*
[
    {name:'正常运行',value:'1',begin:'2020-04-20 08:00:00',end:'2020-04-20 09:00:00',color:'#3DC62D'},
    {name:'运行异常',value:'2',begin:'2020-04-20 09:00:00',end:'2020-04-20 12:00:00','#FF8F28'},
    {name:'停机',value:'3',begin:'2020-04-20 12:00:00',end:'2020-04-20 15:00:00',color:'#AAAAAA'},
]

*/

function StatusBar(config){
    var defaultColorList = ["#3DC62D","#FF8F28","#AAAAAA"];
    var defaultColorListLength = defaultColorList.length;
    if(!config ){
        console.error("config is null");
        return; 
    }
    var elem = config.elem;
    var data = config.data;
    if(!elem instanceof HTMLElement){
        console.error("elem is not a HTMLElement");
        return;
    }
    if(!Array.isArray(data)){
        console.error("data is not an Array");
        return;
    }
    let container = document.createElement("div");
    container.style.width="100%";
    container.style.height="100%";
    container.style.display="flex";
    data.forEach(function(item,index){
        var flexDiv = document.createElement("div");
        container.appendChild(flexDiv);
        var beginTs = toDateTs(item.begin);
        var endTs = toDateTs(item.end);
        var click = config.click;
        if(typeof click =="function"){
            flexDiv.addEventListener("click",function(){
                click(flexDiv,item)
            })
        }
        flexDiv.title = item.name;
        flexDiv.style.background= item.color || defaultColorList[defaultColorListLength%3];
        flexDiv.style.flex= (endTs - beginTs)/1000;
        
    })
    elem.appendChild(container)
    function toDateTs(arg){
        if(typeof arg ==="number"){
            return arg;
        }
        if(typeof arg==="string"){
            arg = new Date(arg);
            if(isNaN(arg.getFullYear()) ){
                console.error("date formate error");
                arg = new Date();
            }
        }
        if(arg instanceof Date){
            return arg.getTime();
        }
        return 0;
    }
}