(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,a){},125:function(e,t,a){"use strict";a.r(t);a(39),a(79);var n,l=a(0),i=a.n(l),r=a(26),c=a.n(r),s=a(8),o=a(16),u=a(11),m=a(9),p=a(10),h={overflowY:"scroll",overflowX:"scroll",height:"500px",width:"900px",position:"relative"},d={flex:1,position:"relative"},A={flex:.1,position:"relative"},E={size:"sm",vertical:!1,flex:1,padding:15},f={fluid:!0,maxWidth:"100%"},b={justify:"center",alignContent:"center",alignItems:"center",textAlign:"center",width:"100%",fluid:!0,fontSize:"12px"},g={width:"85%",height:"100%"},y="100%",S="100%",v={position:"center",height:"100px",width:"88px"},j=a(77),x=a(17),O=a(20),w=a(45),k=(a(51),function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).initSlider={initial:0,min:0,max:0,step:0,value:0},a.handleSliderChange=function(e){e.persist();var t=a.state.slider;t.value=e.target.value,a.setState({slider:t}),a.updateStatus(!0),a.notifyValue()},a.state={updated:!1,slider:a.initSlider,setSlider:null,sync:!0},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"componentDidUpdate",value:function(){return!!this.state.updated}},{key:"updateStatus",value:function(e){this.setState({updated:!0})}},{key:"notifyValue",value:function(){(0,this.props.sliderValue)(this.state.slider.value,this.state.updated,this.state.sync)}},{key:"render",value:function(){var e=this,t=this.state.slider,a=this.props,n=a.label,l=a.min,r=a.max,c=a.initial,s=a.step,o=a.multiplier;return i.a.createElement("div",{className:"slider-settings"},i.a.createElement("span",null,n)," ",i.a.createElement("br",null),i.a.createElement("span",null,l," "),i.a.createElement("input",{type:"range",className:"slider",value:t.value||c,id:"customRange1",initial:c,min:l,max:r,step:s,onChange:function(t){return e.handleSliderChange(t)}}),i.a.createElement("span",null," ",r),i.a.createElement("span",null," ",t.value*o,"%"))}}]),t}(l.Component)),C=a(7),N=a(23),W={file:[{name:"brom.jpeg",image:a(52),style:{display:"block",width:"auto",height:"100%"},type:""}],size:1,selected:0},Z=Object(N.a)(function(e){return Object(x.a)({},W)}),z=Object(C.a)(Z,2),B=(z[0],z[1]),V=a(46),L=a.n(V),M=a(66),F=a(13),T=a(37),Y=a.n(T),K={channels:[{uniforms:{brightness:{value:"0.0"},contrast:{value:"0.0"},image:{value:""}},texture:null,name:"",type:""},{uniforms:{brightness:{value:"0.0"},contrast:{value:"0.0"},image:{value:""}},texture:null,name:"",type:""},{uniforms:{brightness:{value:"0.0"},contrast:{value:"0.0"},image:{value:""}},texture:null,name:"",type:""}]},U=Object(N.a)(function(e){return Object(x.a)({},K)}),Q=Object(C.a)(U,2),P=(Q[0],Q[1]),D=B,I=P,R=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={zpp:{type:!0,limitToBounds:!0,panningEnabled:!0,transformEnabled:!0,pinchEnabled:!1,limitToWrapper:!1,disabled:!1,dbClickEnabled:!0,lockAxisX:!1,lockAxisY:!1,velocityEqualToMove:!0,enableWheel:!0,enableTouchPadPinch:!1,enableVelocity:!0,limitsOnWheel:!1,minScale:.5,maxScale:8,step:10,updated:!1,scale:1},slider:{sync:!1,updated:!1},zoomPct:1,prevPct:0,image:{src:a(52),name:"",style:{},x:0,y:0},selected:0},n.sliderValue.bind(Object(O.a)(Object(O.a)(n))),n.updateZoomValue.bind(Object(O.a)(Object(O.a)(n))),n}return Object(p.a)(t,e),Object(o.a)(t,[{key:"sliderValue",value:function(e,t,a){this.setState({zoomPct:e/100}),this.setState({slider:{updated:t}}),this.setState({slider:{sync:a}})}},{key:"updateZoomValue",value:function(e){this.state.zoomPct!==this.state.prevPct&&(this.state.prevPct=this.state.zoomPct,this.state.zoomPct=e/100)}},{key:"update",value:function(e){this.state.image.name===e.file[e.selected].name&&this.state.selected===e.selected||(this.state.image.name=e.file[e.selected].name,this.state.image.src=e.file[e.selected].image,this.state.image.style=e.file[e.selected].style,this.forceUpdate())}},{key:"resetZoom",value:function(){this.setState(function(e){return Object(x.a)({},e,{zoomPct:1,image:Object(x.a)({},e.image,{x:0,y:0})})})}},{key:"render",value:function(){var e=this,t=(this.props.api.subscribe(function(t){e.update(t)}),this.state.zpp),a=t.limitToBounds,n=t.panningEnabled,l=t.transformEnabled,r=t.pinchEnabled,c=t.limitToWrapper,s=t.disabled,o=t.dbClickEnabled,u=t.lockAxisX,m=t.lockAxisY,p=t.velocityEqualToMove,h=t.enableWheel,d=t.enableTouchPadPinch,A=t.enableVelocity,E=t.limitsOnWheel,f=t.minScale,b=t.maxScale,g=t.step,y=t.scale,S=this.sliderValue;return"0.01"==this.state.zoomPct&&(this.state.zoomPct=y),i.a.createElement("div",{className:"viewer-wrapper"},i.a.createElement(w.b,{defaultScale:1,defaultPositionX:0,defaultPositionY:0,positionX:this.state.image.x,positionY:this.state.image.y,scale:this.state.zoomPct,options:{limitToBounds:a,transformEnabled:l,disabled:s,limitToWrapper:c,minScale:f,maxScale:b},pan:{disabled:!n,lockAxisX:u,lockAxisY:m,velocityEqualToMove:p,velocity:A},pinch:{disabled:!r},doubleClick:{disabled:!o},wheel:{wheelEnabled:h,touchPadEnabled:d,limitsOnWheel:E,step:g}},function(t){t.zoomIn,t.zoomOut,t.resetTransform,t.setDefaultState;var a=t.positionX,n=t.positionY,l=t.scale,r=(t.previousScale,t.options);r.limitToBounds,r.transformEnabled,r.disabled,Object(j.a)(t,["zoomIn","zoomOut","resetTransform","setDefaultState","positionX","positionY","scale","previousScale","options"]);return i.a.createElement("div",null,e.updateZoomValue(l),i.a.createElement(i.a.Fragment,null,i.a.createElement(w.a,null,i.a.createElement("img",{src:e.state.image.src,alt:"viewer",width:e.props.imageWidth})),i.a.createElement("span",{className:"badge badge-primary"},"x : ",Number(a).toFixed(0),"px"),i.a.createElement("span",{className:"badge badge-primary"},"y : ",Number(n).toFixed(0),"px"),i.a.createElement("span",{className:"badge badge-primary"},"Scale : ",Number(100*l).toFixed(0),"%")))}),i.a.createElement(k,{label:"Zoom",width:"40%",min:"50",max:"800",step:"10",initial:this.state.zoomPct,multiplier:"1",sliderValue:S.bind(this),newValue:this.state.zoomPct,sync:this.state.slider.sync}),i.a.createElement("button",{id:"resetZoomBtn",onClick:function(){e.resetZoom()}},"Reset Zoom"))}}]),t}(l.Component),G=(n=R,function(e){return i.a.createElement(n,Object.assign({api:D},e))}),J=a(127),H=a(128),X=a(129),q=a(31),_="\n  uniform sampler2D image;\n\n  uniform float brightness;\n  uniform float contrast;\n  varying vec2 vUv;\n  void main() {\n    gl_FragColor = texture2D(image, vUv);\n    gl_FragColor.rgb += brightness;\n\n    if (contrast > 0.0) {\n      gl_FragColor.rgb = (gl_FragColor.rgb - 0.5) / (1.0 - contrast) + 0.5;\n    } else {\n      gl_FragColor.rgb = (gl_FragColor.rgb - 0.5) * (1.0 + contrast) + 0.5;\n    }\n  }\n",$="\n  varying vec2 vUv;\n\n  void main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n  }\n";var ee=function(e){var t=Object(l.useRef)(),a=Object(l.useRef)(),n=Object(l.useMemo)(function(){return I.getState().channels[e.channel-1].uniforms},[]);return Object(q.b)(function(t){a.current.uniforms.brightness.value=I.getState().channels[e.channel-1].uniforms.brightness.value,a.current.uniforms.contrast.value=I.getState().channels[e.channel-1].uniforms.contrast.value,a.current.uniforms.image.value=I.getState().channels[e.channel-1].uniforms.image.value}),i.a.createElement("mesh",{ref:t,scale:[1,1,1]},i.a.createElement("planeBufferGeometry",{attach:"geometry",args:[5,5]}),i.a.createElement("shaderMaterial",{attach:"material",ref:a,fragmentShader:_,vertexShader:$,uniforms:n}))},te={canvas:[i.a.createElement(ee,{channel:"1",position:[0,0,0]}),i.a.createElement(ee,{channel:"2",position:[0,0,1]}),i.a.createElement(ee,{channel:"3",position:[0,0,2]})]},ae=Object(N.a)(function(e){return Object(x.a)({},te)}),ne=Object(C.a)(ae,2),le=(ne[0],ne[1]),ie={channels:[{selected:!1},{selected:!1},{selected:!1}],lastSelected:1},re=Object(N.a)(function(e){return Object(x.a)({},ie)}),ce=Object(C.a)(re,2),se=(ce[0],ce[1]);var oe=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(l)))).channel=1,a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"altView",value:function(){return i.a.createElement(J.a,{style:b},i.a.createElement(H.a,null,i.a.createElement(X.a,null," Image View ")),i.a.createElement(G,{imageWidth:y}),i.a.createElement("br",null))}},{key:"channelViews",value:function(){var e;return se.getState().channels[this.channel-1].selected&&(e=le.getState().canvas[this.channel-1]),i.a.createElement("div",{id:"stage",style:v},i.a.createElement(q.a,null,e))}},{key:"display",value:function(){return se.getState().channels[0].selected||se.getState().channels[1].selected||se.getState().channels[2].selected?this.channelViews():this.altView()}},{key:"render",value:function(){var e=this;return se.subscribe(function(t){e.channel=t.lastSelected,e.forceUpdate()}),i.a.createElement("div",{className:"main-view",style:A},this.display())}}]),t}(i.a.Component),ue=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("div",{className:"card-axis-xy",style:A},i.a.createElement(J.a,{style:b},i.a.createElement(H.a,null,i.a.createElement(X.a,null," Axis XY "),i.a.createElement(G,{imageWidth:S})))),i.a.createElement("br",null),i.a.createElement("div",{className:"card-axis-yz",style:A},i.a.createElement(J.a,{style:b},i.a.createElement(H.a,null,i.a.createElement(X.a,null," Axis YZ "),i.a.createElement(G,{imageWidth:S})))),i.a.createElement("br",null),i.a.createElement("div",{className:"card-axis-xz",style:A},i.a.createElement(J.a,{style:b},i.a.createElement(H.a,null,i.a.createElement(X.a,null," Axis XZ "),i.a.createElement(G,{imageWidth:S})))))}}]),t}(i.a.Component),me=(a(101),a(71)),pe=a(138);function he(e){return I.getState()&&I.getState().channels.length>0&&e>=1&&I.getState().channels[e-1]&&I.getState().channels[e-1].uniforms.contrast&&I.getState().channels[e-1].uniforms.brightness}function de(e,t){return he(t)?(e!==I.getState().channels[t-1].uniforms.brightness.value&&function(e,t){I.setState(function(a){return{channels:a.channels.map(function(a,n){if(n===t-1){var l=a;return l.uniforms.brightness.value=e,l}return a})}})}(e,t),!0):(console.log("null state",I.getState()," channel: ",t," value: ",e),!1)}function Ae(e,t){return he(t)?(e!==I.getState().channels[t-1].uniforms.contrast.value&&function(e,t){I.setState(function(a){return{channels:a.channels.map(function(a,n){if(n===t-1){var l=a;return l.uniforms.contrast.value=e,l}return a})}})}(e,t),!0):(console.log("null state",I.getState()," channel: ",t," value: ",e),!1)}var Ee=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"updateForFile",value:function(e){if(I.getState().name!==e.file[e.selected].name){var t=(a=e.file[e.selected].image,(new F.TextureLoader).load(a));"image/tiff"===e.file[e.selected].type&&(console.log("tiff detected ==> converting to canvas"),t=function(e){function t(e){return a.apply(this,arguments)}function a(){return(a=Object(M.a)(L.a.mark(function e(t){var a,n;return L.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=new Blob([t]),e.next=3,new Response(a).arrayBuffer();case 3:return n=e.sent,e.abrupt("return",n);case 5:case"end":return e.stop()}},e)}))).apply(this,arguments)}t().then(function(e){var t=e.byteLength;if(console.log(t),t>0){var a=Y.a.decode(e);return Y.a.decodeImage(e,a[0]),Y.a.toRGBA8(a[0])}}).catch(function(e){return console.log(e)});var n=t(e);Promise.resolve(n).then(function(e){return console.log("Uint8Array with RGBA pixel length: "+e.byteLength),new DataView(e,0,28),new F.DataTexture(e,512,512,F.RGBFormat)},function(e){})}(e.file[e.selected].image)),function(e,t,a){I.setState(function(n){return{channels:n.channels.map(function(n,l){if(l===a-1){var i=n;return i.name=t,i.uniforms.image.value=e,i}return n})}})}(t,e.file[e.selected].name,this.props.channel),this.forceUpdate()}var a}},{key:"updateForControls",value:function(e){this.forceUpdate()}},{key:"render",value:function(){var e=this;return D.subscribe(function(t){e.updateForFile(t)}),I.subscribe(function(t){e.updateForControls(t)}),i.a.createElement("div",{class:"image-canvas-container",style:v},i.a.createElement(q.a,{className:"image-canvas"},le.getState().canvas[this.props.channel-1]))}}]),t}(i.a.Component),fe=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(l)))).updateSelection=function(){var e;e=a.props.ch,se.setState(function(t){return{channels:t.channels.map(function(a,n){if(n===e-1){var l=a;return l.selected=!t.channels[n].selected,l}return a})}}),function(e){console.log("updateLastSel ",e),se.setState(function(t){return Object(x.a)({},t,{lastSelected:e})})}(a.props.ch),a.forceUpdate()},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"sliderValueBr",value:function(e){de(e,this.props.ch)}},{key:"sliderValueCt",value:function(e){Ae(e,this.props.ch)}},{key:"resetBrightness",value:function(){de("0.0",this.props.ch)}},{key:"resetContrast",value:function(){Ae("0.0",this.props.ch)}},{key:"render",value:function(){var e=this,t=this.sliderValueBr,a=this.sliderValueCt,n=i.a.createElement(Ee,{className:"annot-view",alt:"Ch`${this.props.ch}` Histogram",height:"100px",channel:this.props.ch}),l=se.getState().channels[this.props.ch-1].selected;return console.log("Channel "+this.props.ch+" : "+l),i.a.createElement("div",null,i.a.createElement(me.a,{className:"channelBtn",outline:!0,color:"primary",id:"channel-btn",onClick:function(){e.updateSelection()},active:l},"Channel ","".concat(this.props.ch)),i.a.createElement(me.a,{className:"viewBtn",outline:!0,color:"secondary",id:"view".concat(this.props.ch)},"View"),i.a.createElement(pe.a,{toggler:"#view".concat(this.props.ch)},i.a.createElement(J.a,{style:b},i.a.createElement(H.a,{style:g},n,'"Insert Look up table here"',i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement("div",{className:"brightness-slider-container"},i.a.createElement(k,{label:"Brightness",width:"40%",min:"0",max:"1",step:"0.1",initial:"0",multiplier:"100",sliderValue:t.bind(this)}),i.a.createElement("button",{id:"resetBrBtn",onClick:function(){e.resetBrightness()}},"Reset Brightness")),i.a.createElement("div",{className:"contrast-slider-container"},i.a.createElement(k,{label:"Contrast",width:"40%",min:"0",max:"10",step:"1",initial:"0",multiplier:"10",sliderValue:a.bind(this)}),i.a.createElement("button",{id:"resetCtBtn",onClick:function(){e.resetContrast()}},"Reset Contrast")),i.a.createElement("div",{className:"blackpoint-slider-container"},i.a.createElement("label",{htmlFor:"blackpoint-slider"}," Black Point "),i.a.createElement("input",{type:"range",className:"slider",id:"blackpoint-slider"})),i.a.createElement("div",{className:"whitepoint-slider-container"},i.a.createElement("label",{htmlFor:"whitepoint-slider"}," White Point "),i.a.createElement("input",{type:"range",className:"slider",id:"whitepoint-slider"}))))))}}]),t}(i.a.Component),be=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"annotations-channel",style:A},i.a.createElement(J.a,{style:b},i.a.createElement(H.a,null,i.a.createElement(X.a,null," Channel Selection "),i.a.createElement(fe,{ch:"1"}),i.a.createElement(fe,{ch:"2"}),i.a.createElement(fe,{ch:"3"}))))}}]),t}(i.a.Component),ge=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(l)))).state={annotations:{annot1Sel:!1,annot2Sel:!1,annot3Sel:!1,annot4Sel:!1}},a.updateSelection=function(e){switch(e){case 1:a.setState(function(e){return{annotations:Object(x.a)({},e.annotations,{annot1Sel:!a.state.annotations.annot1Sel})}});break;case 2:a.setState(function(e){return{annotations:Object(x.a)({},e.annotations,{annot2Sel:!a.state.annotations.annot2Sel})}});break;case 3:a.setState(function(e){return{annotations:Object(x.a)({},e.annotations,{annot3Sel:!a.state.annotations.annot3Sel})}});break;case 4:a.setState(function(e){return{annotations:Object(x.a)({},e.annotations,{annot4Sel:!a.state.annotations.annot4Sel})}})}},a}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("div",{className:"annotations-class",style:A},console.log("Annotations: "+this.state.annotations.annot1Sel+" "+this.state.annotations.annot2Sel+" "+this.state.annotations.annot3Sel+" "+this.state.annotations.annot4Sel),i.a.createElement(J.a,{style:b},i.a.createElement(H.a,null,i.a.createElement(X.a,null," Annotated Class Selection ")),i.a.createElement(me.a,{outline:!0,color:"primary",id:"annot1Btn",onClick:function(){e.updateSelection(1)},active:this.state.annotations.annot1Sel},"Annotation Class 1"),i.a.createElement(me.a,{outline:!0,color:"primary",id:"annot1Btn",onClick:function(){e.updateSelection(2)},active:this.state.annotations.annot2Sel},"Annotation Class 2"),i.a.createElement(me.a,{outline:!0,color:"primary",id:"annot1Btn",onClick:function(){e.updateSelection(3)},active:this.state.annotations.annot3Sel},"Annotation Class 3"),i.a.createElement(me.a,{outline:!0,color:"primary",id:"annot1Btn",onClick:function(){e.updateSelection(4)},active:this.state.annotations.annot4Sel},"Annotation Class 4"))),i.a.createElement("br",null),i.a.createElement(be,null))}}]),t}(i.a.Component),ye=a(130),Se=a(137),ve=a(139),je=a(140),xe=a(131),Oe=a(132),we=a(133),ke=a(141),Ce=a(19),Ne=a(76),We={display:"flex",flexDirection:"row",flexWrap:"wrap",marginTop:16},Ze={display:"inline-flex",borderRadius:2,border:"1px solid #eaeaea",marginBottom:8,marginRight:8,width:50,height:50,padding:4,boxSizing:"border-box"},ze={display:"flex",minWidth:0,overflow:"hidden"},Be={display:"block",width:"auto",height:"100%"};function Ve(e){var t=Object(l.useState)([]),a=Object(C.a)(t,2),n=a[0],r=a[1],c=Object(Ne.a)({accept:"image/png, image/tiff",onDrop:function(e){r(e.map(function(e){return Object.assign(e,{preview:URL.createObjectURL(e)})}))}}),s=c.getRootProps,o=c.getInputProps,u=(n.map(function(e){return i.a.createElement("div",{style:Ze,key:e.name},i.a.createElement("div",{style:ze},i.a.createElement("img",{src:e.preview,style:Be,type:e.type})))}),D.getState().file.map(function(e,t){return i.a.createElement("div",{style:Ze,key:e.name},i.a.createElement("div",{style:ze},i.a.createElement("img",{src:e.image,style:e.style,onClick:function(){return function(e){D.setState(function(t){return Object(x.a)({},t,{selected:e})})}(t)}})))})),m=n.map(function(e){(function(e){var t=!1;return D.setState(function(a){0===a.file.filter(function(t){return t.name===e}).length&&(t=!0)}),t})(e.name)&&(!function(e,t){D.setState(function(a){return{file:[].concat(Object(Ce.a)(a.file),[{name:e.name,image:e.preview,style:t}]),size:a.size+1}})}(e,Be),console.log("fileUploader::update() - updated state: ",D.getState()))});return Object(l.useEffect)(function(){return function(){n.forEach(function(e){return URL.revokeObjectURL(e.preview)})}},[n]),i.a.createElement("section",{className:"container"},i.a.createElement("div",s({className:"dropzone"}),i.a.createElement("input",o()),i.a.createElement("p",null," ",e.name," "),m),i.a.createElement("aside",{style:We},u))}var Le=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement(ye.a,{size:E.size,vertical:E.vertical,style:E},i.a.createElement(Se.a,null,i.a.createElement(ve.a,{caret:!0,color:"primary"},"File"),i.a.createElement(je.a,null,i.a.createElement(xe.a,null," ",i.a.createElement(Ve,{name:"dropdown-image-upload"})," "),i.a.createElement(xe.a,null," Export "))),i.a.createElement(Se.a,null,i.a.createElement(ve.a,{caret:!0,color:"primary"},"Draw"),i.a.createElement(je.a,null,i.a.createElement(Se.a,null,i.a.createElement(ve.a,{caret:!0,color:"none"},"Rectangle"),i.a.createElement(je.a,null,i.a.createElement(Oe.a,null,i.a.createElement(we.a,{placeholder:"username"}),i.a.createElement(ke.a,{addonType:"append"},i.a.createElement(me.a,null,"Add a new annotation class (Rect)"))),i.a.createElement(me.a,{outline:!0,color:"primary"}," Annotation Class 1 "),i.a.createElement(me.a,{outline:!0,color:"primary"}," Annotation Class 2 "),i.a.createElement(me.a,{outline:!0,color:"primary"}," Annotation Class 3 "),i.a.createElement(me.a,{outline:!0,color:"primary"}," Annotation Class 4 "))),i.a.createElement(Se.a,null,i.a.createElement(ve.a,{caret:!0,color:"none"},"Freehand"),i.a.createElement(je.a,null,i.a.createElement(Oe.a,null,i.a.createElement(we.a,{placeholder:"username"}),i.a.createElement(ke.a,{addonType:"append"},i.a.createElement(me.a,null,"Add a new annotation class(Free)"))),i.a.createElement(me.a,{outline:!0,color:"primary"}," Annotation Class 1 "),i.a.createElement(me.a,{outline:!0,color:"primary"}," Annotation Class 2 "),i.a.createElement(me.a,{outline:!0,color:"primary"}," Annotation Class 3 "),i.a.createElement(me.a,{outline:!0,color:"primary"}," Annotation Class 4 "))))),i.a.createElement(Se.a,null,i.a.createElement(ve.a,{caret:!0,color:"primary"},"Edit"),i.a.createElement(je.a,null,i.a.createElement(xe.a,{disabled:!0}," 1 "),i.a.createElement(xe.a,null," 2 "))),i.a.createElement(me.a,{outline:!0,color:"primary",className:"image-upload-btn"}," ",i.a.createElement(Ve,{name:"Import Image"}),"  "))}}]),t}(i.a.Component),Me=a(134),Fe=a(135),Te=a(136),Ye=function(e){function t(){return Object(s.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"main",style:h},i.a.createElement(Le,null),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement(Me.a,{style:f},i.a.createElement(Fe.a,{style:d},i.a.createElement(Te.a,{xs:"3"},i.a.createElement(ue,null)),i.a.createElement(Te.a,{xs:"6"},i.a.createElement(oe,null)),i.a.createElement(Te.a,{xs:"3"},i.a.createElement(ge,null)))))}}]),t}(i.a.Component);var Ke=document.getElementById("root");c.a.render(i.a.createElement(function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(Ye,null))},null),Ke)},39:function(e,t,a){},51:function(e,t,a){},52:function(e,t){e.exports="data:image/jpeg;base64,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"},78:function(e,t,a){e.exports=a(125)}},[[78,1,2]]]);
//# sourceMappingURL=main.d1475d00.chunk.js.map