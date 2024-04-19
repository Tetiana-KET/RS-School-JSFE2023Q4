var B=Object.defineProperty;var E=(a,t,e)=>t in a?B(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var s=(a,t,e)=>(E(a,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&i(h)}).observe(document,{childList:!0,subtree:!0});function e(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=e(o);fetch(o.href,r)}})();function _(a){return a!=null}function q(a,t){return t instanceof a}function I(a){return typeof a=="string"}function C(){return Math.floor(Math.random()*1e4)+1}function y(a){const t=JSON.stringify(a);sessionStorage.setItem("user",t)}function $(){const a=sessionStorage.getItem("user");return a?JSON.parse(a):null}function O(a){const t=sessionStorage.getItem("user");if(t){const e=JSON.parse(t);e.isLogined=a,y(e)}}function T(){const a=sessionStorage.getItem("user")||"";return JSON.parse(a).id||""}function P(){const a=sessionStorage.getItem("user")||"";return a&&JSON.parse(a).isLogined||!1}function F(){const a=sessionStorage.getItem("user");let t;return a&&(t=JSON.parse(a).login),t||""}const S=new WeakMap;class n{constructor(t,e){s(this,"nodeElement");s(this,"resizeObserver");const{className:i="",text:o="",id:r=void 0,children:h=[]}=e??{};if(!I(t)&&_(t)&&n.findComponentOf(t))throw new Error(`Component of ${String(t)} already exists`);const p=I(t)?document.createElement(t):t;r&&(p.id=r),h&&this.appendChildren(h),p.className=i,p.textContent=o,this.nodeElement=p,S.set(this.nodeElement,this)}static setStyles(t,e){Object.assign(t.style,{...e})}static findComponentOf(t){const e=S.get(t);if(_(e))return e}appendChild(t){return this.nodeElement.appendChild(t.nodeElement),t}appendChildren(t){return t.forEach(e=>{this.appendChild(e)}),this}get element(){return this.nodeElement}getChildAt(t){return this.getChildren()[t]}getChildren(t){const e=Array.from(this.nodeElement.childNodes).map(i=>n.findComponentOf(i)).filter(i=>_(i));return _(t)?e.filter(i=>q(t,i)):e}get childrenCount(){return this.nodeElement.childNodes.length}setTextContent(t){return this.nodeElement.textContent=t,this}setAttribute(t,e){return this.nodeElement.setAttribute(t,e),this}removeAttribute(t){this.nodeElement.removeAttribute(t)}toggleClass(t,e){return t&&this.nodeElement.classList.toggle(t,e),this}observe(t){return this.unobserve(),this.resizeObserver=new ResizeObserver(e=>t(e[0])),this.resizeObserver.observe(this.nodeElement),this}unobserve(){return _(this.resizeObserver)&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this}destroy(){this.unobserve(),this.destroyChildren(),this.nodeElement.remove()}destroyChildren(){this.getChildren().forEach(t=>{t.destroy()})}}const x="_footer_yj8b4_2",j="_footer-container_yj8b4_14",R="_social-items_yj8b4_23",M="_social-item_yj8b4_23",D="_developer_yj8b4_41",W="_social-item-link_yj8b4_41",V="_rs-icon-wrap_yj8b4_58",H="_rsschool-link_yj8b4_66",l={footer:x,"footer-container":"_footer-container_yj8b4_14",footerContainer:j,"social-items":"_social-items_yj8b4_23",socialItems:R,"social-item":"_social-item_yj8b4_23",socialItem:M,developer:D,"social-item-link":"_social-item-link_yj8b4_41",socialItemLink:W,"rs-icon-wrap":"_rs-icon-wrap_yj8b4_58",rsIconWrap:V,"rsschool-link":"_rsschool-link_yj8b4_66",rsschoolLink:H};class z extends n{constructor(){super("footer",{className:`${l.footer}`}),this.render()}render(){this.element.innerHTML=`
    <div class="${l.footerContainer}">
      <ul class="${l.socialItems} ${l.developer}">
        <li class="${l.socialItem}">
          <a class="${l.socialItemLink}" href="https://github.com/Tetiana-KET" target="_blank">
            Tetiana
          </a>
        </li>
        <li class="${l.socialItem}">
          <a class="${l.socialItemLink}" href="https://github.com/Tetiana-KET" target="_blank">
            <svg viewBox="64 64 896 896" focusable="false" data-icon="github" width="1em" height="1em" fill="#ffffff" aria-hidden="true"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path></svg>
          </a>
        </li>
      </ul>
      <div class="${l.rsIconWrap} ${l.rsIconWrap}">
        <a href="https://rs.school/" class="${l.socialItem} ${l.rsschoolLink}" target="_blank">
        </a>
      </div>
      <ul class="${l.socialItems} ${l.rsSchool}">
        <li class="${l.socialItem} ${l.socialYear}">
          2024
        </li>
        <li class="${l.socialItem}">
          <a class="${l.socialItemLink}" href="https://www.youtube.com/c/rollingscopesschool" target="_blank">
            <svg viewBox="64 64 896 896" focusable="false" data-icon="youtube" width="1em" height="1em" fill="#ffffff" aria-hidden="true"><path d="M941.3 296.1a112.3 112.3 0 00-79.2-79.3C792.2 198 512 198 512 198s-280.2 0-350.1 18.7A112.12 112.12 0 0082.7 296C64 366 64 512 64 512s0 146 18.7 215.9c10.3 38.6 40.7 69 79.2 79.3C231.8 826 512 826 512 826s280.2 0 350.1-18.8c38.6-10.3 68.9-40.7 79.2-79.3C960 658 960 512 960 512s0-146-18.7-215.9zM423 646V378l232 133-232 135z"></path></svg>
          </a>
        </li>
        <li class="${l.socialItem}">
          <a class="${l.socialItemLink}" href="https://discord.com/invite/PRADsJB" target="_blank">
            <svg width="1em" height="1em" fill="#ffffff" viewBox="0 -7 71 71" xmlns="http://www.w3.org/2000/svg"><g><path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"></path></g></svg>
          </a>
        </li>
      </ul>
    </div>`}}class f{constructor(){s(this,"listeners",{})}subscribe(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)}emit(t,e){const i=this.listeners[t];i&&i.forEach(o=>o(e))}}const u=new f,b=new f,w=new f,k=new f,J="_header-logo_7703c_1",G="_header_7703c_1",Z="_header-container_7703c_16",K="_buttons-wrap_7703c_25",X="_button_7703c_25",Q="_user-info_7703c_47",Y="_fadeInDown_7703c_1",g={"header-logo":"_header-logo_7703c_1",headerLogo:J,header:G,"header-container":"_header-container_7703c_16",headerContainer:Z,"buttons-wrap":"_buttons-wrap_7703c_25",buttonsWrap:K,button:X,"user-info":"_user-info_7703c_47",userInfo:Q,fadeInDown:Y};class ee extends n{constructor(e){super("header",{className:`${g.header}`,id:"header"});s(this,"headerContainer");s(this,"headerLogo");s(this,"buttonsWrap");s(this,"infoButton");s(this,"logOutButton");s(this,"userInfo");s(this,"userName",null);s(this,"webSocketAPI");this.webSocketAPI=e,this.headerContainer=new n("div",{className:`${g.headerContainer}`,id:"headerContainer"}),this.appendChild(this.headerContainer),this.headerLogo=new n("h2",{className:`${g.headerLogo}`,text:"Fun Chat"}),this.userInfo=new n("div",{className:`${g.userInfo}`,id:"userInfo"}),this.buttonsWrap=new n("div",{className:`${g.buttonsWrap}`}),this.infoButton=new n("button",{className:`${g.button}`,text:"About",id:"infoButton"}).setAttribute("type","button"),this.logOutButton=new n("button",{className:`${g.button}`,text:"Log out",id:"logOutButton"}).setAttribute("type","button").setAttribute("disabled",""),this.buttonsWrap.appendChildren([this.infoButton,this.logOutButton]),this.headerContainer.appendChildren([this.headerLogo,this.userInfo,this.buttonsWrap]),this.infoButton.element.addEventListener("click",this.onAboutBtnClick.bind(this)),this.logOutButton.element.addEventListener("click",this.onLogoutBtnClick.bind(this)),u.subscribe("aboutBtnClicked",this.disableAboutBtn.bind(this)),u.subscribe("successLogin",this.handleSuccessLogin.bind(this)),u.subscribe("backButtonClicked",this.enableAboutBtn.bind(this)),this.checkIsUserLogged()}setUserNameInHeader(){const e=sessionStorage.getItem("user");if(e){const i=JSON.parse(e);this.userName=i.login,this.userInfo.element.textContent=`User: ${this.userName}`}}checkIsUserLogged(){P()?this.enableLogoutBtn():this.disableLogoutBtn()}onAboutBtnClick(e){window.location.hash="#about",u.emit("aboutBtnClicked",e)}onLogoutBtnClick(){console.log("click"),this.userInfo.element.textContent="",this.disableLogoutBtn();let e,i;const o=sessionStorage.getItem("user");if(o){const r=JSON.parse(o);e=r.login,i=r.password}e&&i&&(console.log("login && password"),this.webSocketAPI.userLogout(e,i))}disableAboutBtn(){this.infoButton.element.setAttribute("disabled","")}enableAboutBtn(){this.infoButton.element.removeAttribute("disabled")}enableLogoutBtn(){this.logOutButton.element.removeAttribute("disabled")}disableLogoutBtn(){this.logOutButton.element.setAttribute("disabled","")}handleSuccessLogin(){this.setUserNameInHeader(),this.enableLogoutBtn()}}const te="_about-page_l5qig_1",se="_about-page_wrapper_l5qig_7",ie="_about-page_title_l5qig_19",oe="_about-page_description_l5qig_21",ae="_about-page_button_l5qig_24",ne="_about-page_developer_l5qig_34",m={"about-page":"_about-page_l5qig_1",aboutPage:te,"about-page_wrapper":"_about-page_wrapper_l5qig_7",aboutPageWrapper:se,"about-page_title":"_about-page_title_l5qig_19",aboutPageTitle:ie,"about-page_description":"_about-page_description_l5qig_21",aboutPageDescription:oe,"about-page_button":"_about-page_button_l5qig_24",aboutPageButton:ae,"about-page_developer":"_about-page_developer_l5qig_34",aboutPageDeveloper:ne};class v extends n{constructor(){super("section",{className:`${m.aboutPage}`,id:"aboutPage"});s(this,"aboutPageWrapper");s(this,"aboutPageTitle");s(this,"aboutPageDescription");s(this,"aboutPageBackButton");s(this,"aboutPageDeveloper");this.aboutPageWrapper=new n("div",{className:`${m.aboutPageWrapper}`,id:"aboutPageWrapper"}),this.aboutPageTitle=new n("h2",{className:`${m.aboutPageTitle}`,text:"Welcome to Fun Chat"}),this.aboutPageDescription=new n("p",{className:`${m.aboutPageDescription}`}),this.aboutPageBackButton=new n("button",{className:`${m.aboutPageButton}`,text:"Back",id:"aboutPageButton"}).setAttribute("type","button"),this.aboutPageDeveloper=new n("a",{className:`${m.aboutPageDeveloper}`,id:"loginForm"}),this.setAboutPageDescription(),this.setPageElements(),this.setDeveloperProperties(),this.appendChild(this.aboutPageWrapper),this.aboutPageBackButton.element.addEventListener("click",this.onBackButtonClick.bind(this))}setAboutPageDescription(){this.aboutPageDescription.element.textContent=`An interactive chat application developed as part of the RSSchool JS/FE 2023Q4 course. 
      Fun Chat provides users with a platform to engage in real-time communication through text messages.
      Key Features:
      Real-time Messaging: Engage in real-time conversations with other users.
      User Authentication: Securely log in to access the chat platform.
      Responsive Design: Enjoy a seamless experience across various devices and screen sizes.

      Experience the joy of real-time communication and connect with friends and colleagues in Fun Chat. Start chatting now and discover a new way to stay connected!`}setPageElements(){this.aboutPageWrapper.appendChildren([this.aboutPageTitle,this.aboutPageDescription,this.aboutPageDeveloper,this.aboutPageBackButton])}setDeveloperProperties(){this.aboutPageDeveloper.setAttribute("href","https://github.com/Tetiana-KET").setAttribute("target","_blank").setTextContent("Tetiana-KET")}onBackButtonClick(e){window.history.go(-1),u.emit("backButtonClicked",e)}}const re="_user-line_2kb04_1",le="_user-line_name_2kb04_8",de="_user-line_status_2kb04_13",L={"user-line":"_user-line_2kb04_1",userLine:re,"user-line_name":"_user-line_name_2kb04_8",userLineName:le,"user-line_status":"_user-line_status_2kb04_13",userLineStatus:de};class A extends n{constructor(e,i){super("li",{className:`${L.userLine}`});s(this,"userLineName");s(this,"userLineStatus");this.setAttribute("id",`${e}`),this.userLineName=new n("span",{className:`${L.userLineName}`,id:`userLineName_${e}`}).setTextContent(`${e}`),this.userLineStatus=new n("span",{className:`${L.userLineStatus}`,id:`userLineStatus_${e}`}).setAttribute("data-status",`${i}`),this.appendChildren([this.userLineStatus,this.userLineName])}}const ce="_chat-page_1qqkj_1",ue="_chat-page_aside_1qqkj_9",he="_chat-page_dialog_1qqkj_20",ge="_aside_contact-search_1qqkj_31",pe="_dialog-input_1qqkj_32",me="_aside_users-list_1qqkj_44",_e="_aside_user-line_1qqkj_54",be="_dialog-header_1qqkj_58",we="_dialog-header_user-name_1qqkj_68",fe="_dialog-header_user-status_1qqkj_74",Ce="_dialog-body_1qqkj_78",Le="_dialog-form_1qqkj_84",Pe="_dialog-form-button_1qqkj_94",c={"chat-page":"_chat-page_1qqkj_1",chatPage:ce,"chat-page_aside":"_chat-page_aside_1qqkj_9",chatPageAside:ue,"chat-page_dialog":"_chat-page_dialog_1qqkj_20",chatPageDialog:he,"aside_contact-search":"_aside_contact-search_1qqkj_31",asideContactSearch:ge,"dialog-input":"_dialog-input_1qqkj_32",dialogInput:pe,"aside_users-list":"_aside_users-list_1qqkj_44",asideUsersList:me,"aside_user-line":"_aside_user-line_1qqkj_54",asideUserLine:_e,"dialog-header":"_dialog-header_1qqkj_58",dialogHeader:be,"dialog-header_user-name":"_dialog-header_user-name_1qqkj_68",dialogHeaderUserName:we,"dialog-header_user-status":"_dialog-header_user-status_1qqkj_74",dialogHeaderUserStatus:fe,"dialog-body":"_dialog-body_1qqkj_78",dialogBody:Ce,"dialog-form":"_dialog-form_1qqkj_84",dialogForm:Le,"dialog-form-button":"_dialog-form-button_1qqkj_94",dialogFormButton:Pe};class U extends n{constructor(){super("section",{className:`${c.chatPage}`,id:"chatPage"});s(this,"aside");s(this,"contactSearch");s(this,"usersList");s(this,"dialogContainer");s(this,"dialogHeader");s(this,"dialogHeaderUserName");s(this,"dialogHeaderUserStatus");s(this,"dialogBody");s(this,"dialogForm");s(this,"dialogInput");s(this,"dialogFormButton");this.aside=new n("aside",{className:`${c.chatPageAside}`,id:"chatPageAside"}),this.contactSearch=new n("input",{className:`${c.asideContactSearch}`,id:"asideContactSearch"}),this.usersList=new n("ul",{className:`${c.asideUsersList}`,id:"asideUsersList"}),this.dialogContainer=new n("article",{className:`${c.chatPageDialog}`,id:"chatPageDialog"}),this.dialogHeader=new n("h3",{className:`${c.dialogHeader}`,id:"dialogHeader"}),this.dialogHeaderUserName=new n("span",{className:`${c.dialogHeaderUserName}`,id:"dialogUserName"}),this.dialogHeaderUserStatus=new n("span",{className:`${c.dialogHeaderUserStatus}`,id:"dialogUserStatus"}),this.dialogBody=new n("div",{className:`${c.dialogBody}`,id:"dialogBody"}),this.dialogForm=new n("form",{className:`${c.dialogForm}`,id:"dialogForm"}),this.dialogInput=new n("input",{className:`${c.dialogInput}`,id:"dialogInput"}),this.dialogFormButton=new n("button",{className:`${c.dialogFormButton}`,text:"Send",id:"dialogFormButton"}),this.constructPage()}constructPage(){this.dialogFormButton.setAttribute("disabled","true"),this.dialogInput.setAttribute("placeholder","Enter your message..."),this.contactSearch.setAttribute("placeholder","Search..."),this.aside.appendChildren([this.contactSearch,this.usersList]),this.dialogHeader.appendChildren([this.dialogHeaderUserName,this.dialogHeaderUserStatus]),this.dialogForm.appendChildren([this.dialogInput,this.dialogFormButton]),this.dialogContainer.appendChildren([this.dialogHeader,this.dialogBody,this.dialogForm]),this.appendChildren([this.aside,this.dialogContainer])}renderUsers(e,i){e.forEach(o=>{const r=o.login,h=o.isLogined||!1,p=new A(r,h);i.append(p.element)})}drawNewLoggedUser(e,i){const o=e.login,r=e.isLogined||!1,h=new A(o,r);i.append(h.element)}displayUpdatedStatus(e){const i=e.login,o=e.isLogined||!1,r=document.getElementById(`userLineStatus_${i}`);r&&r.setAttribute("data-status",`${o}`)}}class Ie{constructor(t){s(this,"webSocketAPI");this.webSocketAPI=t}validateUserName(t){return/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z_-]*\d?[a-zA-Z_-]*$/.test(t)&&t.length>=4}validatePassword(t){return/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\\da-zA-Z]).{8,}$/.test(t)&&t.length>=8}handleFormSubmit(t){this.webSocketAPI.userAuthentication(t)}}const Se="_login-page_1lwrq_1",ve="_login-form-wrapper_1lwrq_4",Ae="_login-form_1lwrq_4",Ue="_login-form-title_1lwrq_34",Ne="_login-form-input_1lwrq_43",ye="_last-name-input_1lwrq_57",ke="_login-form-label_1lwrq_61",Be="_input-tooltip_1lwrq_75",Ee="_input-tooltip-active_1lwrq_103",qe="_form-button_1lwrq_108",$e="_error-message_1lwrq_115",d={"login-page":"_login-page_1lwrq_1",loginPage:Se,"login-form-wrapper":"_login-form-wrapper_1lwrq_4",loginFormWrapper:ve,"login-form":"_login-form_1lwrq_4",loginForm:Ae,"login-form-title":"_login-form-title_1lwrq_34",loginFormTitle:Ue,"login-form-input":"_login-form-input_1lwrq_43",loginFormInput:Ne,"last-name-input":"_last-name-input_1lwrq_57",lastNameInput:ye,"login-form-label":"_login-form-label_1lwrq_61",loginFormLabel:ke,"input-tooltip":"_input-tooltip_1lwrq_75",inputTooltip:Be,"input-tooltip-active":"_input-tooltip-active_1lwrq_103",inputTooltipActive:Ee,"form-button":"_form-button_1lwrq_108",formButton:qe,"error-message":"_error-message_1lwrq_115",errorMessage:$e};class N extends n{constructor(e){super("section",{className:`${d.loginPage}`,id:"loginPage"});s(this,"controller");s(this,"form");s(this,"passwordInput");s(this,"loginInput");s(this,"loginButton");s(this,"infoButton");s(this,"loginLabel");s(this,"passwordLabel");s(this,"loginTooltip");s(this,"passwordTooltip");s(this,"formTitle");s(this,"errorMessage");s(this,"isLoginValid",!1);s(this,"isPasswordValid",!1);s(this,"webSocketAPI");this.webSocketAPI=e,this.controller=new Ie(this.webSocketAPI),this.form=new n("form",{className:`${d.loginForm}`,id:"loginForm"}),this.formTitle=new n("h2",{className:`${d.loginFormTitle}`,text:"login",id:"loginForm"}),this.loginTooltip=new n("span",{text:"Use both upper and lower case English letters"}),this.passwordTooltip=new n("span",{text:"Requires upper and lower case letters and digits"}),this.loginInput=new n("input",{id:"loginInput",className:d.loginFormInput}),this.passwordInput=new n("input",{id:"passwordInput",className:d.loginFormInput}),this.loginLabel=new n("label",{text:"Login",className:d.loginFormLabel}),this.passwordLabel=new n("label",{text:"Password",className:d.loginFormLabel}),this.loginButton=new n("button",{className:d.formButton,text:"Log in",id:"loginBtn"}).setAttribute("type","submit").setAttribute("disabled","true"),this.infoButton=new n("button",{className:d.formButton,text:"About",id:"infoButton"}).setAttribute("type","button"),this.errorMessage=new n("p",{className:d.errorMessage}),this.setFormElements(),this.setEventListenerToForm(),this.setInputsProperties(),this.appendChild(this.form),u.subscribe("authError",i=>{this.drawErrorMessage(i)}),u.subscribe("aboutBtnClicked",this.disableBtn.bind(this)),u.subscribe("backButtonClicked",this.enableBtn.bind(this)),this.infoButton.element.addEventListener("click",this.onAboutBtnClick.bind(this))}setEventListenerToForm(){this.loginInput.element.addEventListener("input",this.inputLoginOnChange.bind(this)),this.passwordInput.element.addEventListener("input",this.inputPasswordOnChange.bind(this)),this.form.element.addEventListener("submit",e=>{e.preventDefault(),this.onFormSubmit()})}onAboutBtnClick(e){window.location.hash="#about",u.emit("aboutBtnClicked",e)}disableBtn(){this.infoButton.element.disabled=!0}enableBtn(){this.infoButton.element.disabled=!1}setInputsProperties(){this.passwordTooltip.element.classList.add(d.inputTooltip,d.inputTooltipPassword),this.loginTooltip.element.classList.add(d.inputTooltip,d.inputTooltipName),this.loginInput.setAttribute("type","text").setAttribute("required","true").setAttribute("name","loginForm").setAttribute("placeholder",'min length 4 chars, "-" and "_" allowed').setAttribute("minlength","4"),this.passwordInput.setAttribute("type","password").setAttribute("required","true").setAttribute("name","loginForm").setAttribute("placeholder","Password, min length 6 symbols").setAttribute("minlength","8")}setFormElements(){this.loginLabel.appendChild(this.loginTooltip),this.passwordLabel.appendChild(this.passwordTooltip),this.form.appendChildren([this.formTitle,this.loginLabel,this.loginInput,this.passwordLabel,this.passwordInput,this.loginButton,this.infoButton])}inputLoginOnChange(){const e=this.loginInput.element.value.trim();return this.isLoginValid=this.controller.validateUserName(e),this.loginButton.element.disabled=!this.loginBtnIsDisabled(),this.loginTooltip.element.style.opacity=this.isLoginValid?"0":"1",this.loginTooltip.element.style.visibility=this.isLoginValid?"hidden":"visible",this.isLoginValid}inputPasswordOnChange(){const e=this.passwordInput.element.value.trim();return this.isPasswordValid=this.controller.validatePassword(e),this.loginButton.element.disabled=!this.loginBtnIsDisabled(),this.passwordTooltip.element.style.opacity=this.isPasswordValid?"0":"1",this.passwordTooltip.element.style.visibility=this.isPasswordValid?"hidden":"visible",this.isPasswordValid}loginBtnIsDisabled(){return this.isPasswordValid&&this.isLoginValid}onFormSubmit(){const e={login:this.getLogin(),password:this.getPassword()};this.controller.handleFormSubmit(e)}getLogin(){return this.loginInput.element.value}getPassword(){return this.passwordInput.element.value}drawErrorMessage(e){this.errorMessage.element.textContent=`${e}`,this.form.appendChild(this.errorMessage),setTimeout(()=>{this.errorMessage.destroy(),this.passwordInput.element.value=""},2e3)}}function Oe(a){return"".includes(a)?"":"#chat".includes(a)?"#chat":"#about".includes(a)?"#about":""}class Te{constructor(t){s(this,"setPage");s(this,"currentPage");this.currentPage="",this.setPage=t,window.onhashchange=()=>{this.handleLocation()},window.onload=()=>{this.handleLocation()}}handleLocation(){const t=window.location.hash;this.currentPage=Oe(t),this.setPage(this.currentPage)}}const Fe="_main_mnmne_1",xe={main:Fe};class je{constructor(){s(this,"activeUsers",[]);s(this,"inactiveUsers",[]);s(this,"allUsers",[])}updateActiveUsers(t){this.activeUsers=t,console.log("active Users:",this.activeUsers)}updateInactiveUsers(t){this.inactiveUsers=t,console.log("Inactive Users:",this.inactiveUsers)}addNewActiveUsers(t){this.activeUsers.push(t)}updateUserStatusArrays(t){const e=this.activeUsers.findIndex(o=>o.login===t.login),i=this.inactiveUsers.findIndex(o=>o.login===t.login);e!==-1?(this.activeUsers[e].isLogined=t.isLogined,this.inactiveUsers.push(...this.activeUsers.splice(e,1))):i!==-1?(this.inactiveUsers[i].isLogined=t.isLogined,this.activeUsers.push(...this.inactiveUsers.splice(i,1))):e===-1&&i===-1&&(this.addNewActiveUsers(t),k.emit("newUserAuth",t))}}class Re{constructor(t,e){s(this,"chatModel");s(this,"webSocketAPI");s(this,"chatPage");this.webSocketAPI=t,this.chatPage=e,this.chatModel=new je,b.subscribe("USER_ACTIVE_data",i=>{this.chatModel.updateActiveUsers(i.payload.users);const o=document.getElementById("asideUsersList");o&&this.chatPage.renderUsers(this.chatModel.activeUsers,o)}),b.subscribe("USER_INACTIVE_data",i=>{this.chatModel.updateInactiveUsers(i.payload.users);const o=document.getElementById("asideUsersList");o&&this.chatPage.renderUsers(this.chatModel.inactiveUsers,o)}),w.subscribe("USER_EXTERNAL_LOGIN",i=>{const{user:o}=i.payload;o&&(this.chatPage.displayUpdatedStatus(o),this.chatModel.updateUserStatusArrays(o))}),w.subscribe("USER_EXTERNAL_LOGOUT",i=>{const{user:o}=i.payload;o&&(this.chatPage.displayUpdatedStatus(o),this.chatModel.updateUserStatusArrays(o))}),k.subscribe("newUserAuth",this.callDrawNewUser.bind(this))}callDrawNewUser(t){const e=document.getElementById("asideUsersList");e&&this.chatPage.drawNewLoggedUser(t,e)}start(){this.webSocketAPI.start()}}class Me extends n{constructor(e){super("main",{className:`${xe.main}`,id:"main"});s(this,"router");s(this,"loginPage");s(this,"aboutPage");s(this,"chatPage");s(this,"webSocketAPI");s(this,"chatController");this.webSocketAPI=e,this.loginPage=new N(this.webSocketAPI),this.aboutPage=new v,this.chatPage=new U,this.chatController=new Re(this.webSocketAPI,this.chatPage),this.appendChild(this.loginPage),this.router=new Te(this.setPageContent.bind(this)),console.log(this.router),window.addEventListener("unload",()=>{this.setPageContent()}),this.chatController.start()}setPageContent(){const e=window.location.hash;if(P()||e==="#chat"&&(window.location.hash=""),P()){const i=document.getElementById("userInfo"),o=$();if(i&&(i.textContent=`User: ${F()}`),o){const r={id:o.id||"",type:"USER_LOGIN",payload:{user:{login:o.login,password:o.password}}};this.webSocketAPI.ws.send(JSON.stringify(r))}}e===""?this.drawLoginPage():e==="#chat"?this.drawChatPage():e==="#about"&&this.drawAboutPage()}drawAboutPage(){this.destroyChildren(),this.aboutPage=new v,this.appendChild(this.aboutPage)}drawChatPage(){this.destroyChildren(),this.chatPage=new U,this.appendChild(this.chatPage),this.webSocketAPI.getAllAuthenticatedUsers(),this.webSocketAPI.getAllUnauthorizedUsers()}drawLoginPage(){this.destroyChildren(),this.loginPage=new N(this.webSocketAPI),this.appendChild(this.loginPage)}}class De{constructor(){s(this,"ws");s(this,"errorMessage","");this.ws=new WebSocket("ws://127.0.0.1:4000")}userAuthentication(t){const e={id:C().toString(),type:"USER_LOGIN",payload:{user:t}};this.ws.readyState===WebSocket.OPEN?this.ws.send(JSON.stringify(e)):this.ws.addEventListener("open",()=>{this.ws.send(JSON.stringify(e))});const i={login:e.payload.user.login,password:e.payload.user.password,isLogined:!1,id:e.id};y(i)}userLogout(t,e){const i={id:T(),type:"USER_LOGOUT",payload:{user:{login:t,password:e}}};console.log("USER_LOGOUT REQUEST message",i),this.ws.send(JSON.stringify(i))}getAllAuthenticatedUsers(){const t={id:C().toString(),type:"USER_ACTIVE",payload:null};this.ws.send(JSON.stringify(t))}getAllUnauthorizedUsers(){const t={id:C().toString(),type:"USER_INACTIVE",payload:null};this.ws.send(JSON.stringify(t))}handleMessage(t){const e=JSON.parse(t.data);if(e.type==="ERROR"&&(this.errorMessage=e.payload.error,u.emit("authError",e.payload.error)),e.type==="USER_LOGIN"){u.emit("successLogin",e),window.location.hash="#chat";const{isLogined:i}=e.payload.user;O(i)}e.type==="USER_LOGOUT"&&(sessionStorage.clear(),window.location.hash="",u.emit("userLoggedOut",e)),e.type==="USER_ACTIVE"&&b.emit("USER_ACTIVE_data",e),e.type==="USER_INACTIVE"&&b.emit("USER_INACTIVE_data",e),e.type==="USER_EXTERNAL_LOGIN"&&w.emit("USER_EXTERNAL_LOGIN",e),e.type==="USER_EXTERNAL_LOGOUT"&&w.emit("USER_EXTERNAL_LOGOUT",e)}start(){this.ws.addEventListener("message",this.handleMessage.bind(this))}}class We extends n{constructor(){super("div",{className:"site-wrapper",id:"siteWrapper"});s(this,"webSocketAPI");this.webSocketAPI=new De;const e=new ee(this.webSocketAPI),i=new Me(this.webSocketAPI),o=new z;this.appendChildren([e,i,o])}}const Ve=()=>new We;class He{constructor(t,e){s(this,"siteWrapper");s(this,"root");this.siteWrapper=t,this.root=e}start(){this.root.append(this.siteWrapper.element)}}const ze=new He(Ve(),document.body);ze.start();
