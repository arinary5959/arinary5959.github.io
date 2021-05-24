let gClientID = '126508767249-438g3lig10tl2btavufc3npkjp75pt9k.apps.googleusercontent.com'
const goolgeloginBtn = document.querySelector('#goolgeloginbtn')
console.log(goolgeloginBtn)
console.log(logInBtn)
// var googleAuth
function init() {
    console.log('init')
    gapi.load('auth2', function() {
        console.log('auth2');
        console.log(gapi.auth2);
        window.GoogleAuth = gapi.auth2.init({
            client_id: gClientID,
            scope: 'profile email'
        });
        // googleAuth를 잘 가져왔음.
        console.log(GoogleAuth)
        // 새로고침시 구글 로그인상태 확인
        // GoogleAuth.then(function (){
        //     if(GoogleAuth.isSignedIn.get()){
        //         console.log('logged')
        //         // 새로고침했을 때 로그인되어 있음
        //         logInBtn.innerHTML = "<h2>Log-out</h2>";
        //         logInBtn.classList.add('logged');
        //     }else{
        //         console.log('goolge not logged')
        //     }
        // }, function (){
        //     console.log('googleAuth failed')
        // });
    });
}
// 윈도우 로드시 init하여 구글auth가져옴. gapi 사용가능(이벤트클릭시에)/전역에서는 gapi를 할당하는 게 init보다 빨라서(비동기) 안됨
goolgeloginBtn.addEventListener('click', gLogIn);
function gLogIn(e) {
    console.log('google')
    e.preventDefault();
    // var GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signIn({
        scope:'profile email'
    }).then(function () {
        console.log('User signed in.');
        logInBtn.innerHTML = "<h2>Log-out</h2>";
        logInBtn.classList.add('logged');
        // var user = GoogleAuth.currentUser.get();
        // console.log(user)
        var gProfile = GoogleAuth.currentUser.get().getBasicProfile();
        console.log('ID: ' + gProfile.getId());
        console.log('Full Name: ' + gProfile.getName());
        console.log('Given Name: ' + gProfile.getGivenName());
        console.log('Family Name: ' + gProfile.getFamilyName());
        console.log('Image URL: ' + gProfile.getImageUrl());
        console.log('Email: ' + gProfile.getEmail());;
        modalclose()
    }, function (){
        console.log('login failed')
    });
    
}
function gLogOut() {
    // e.preventDefault();
    // var GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signOut().then(function () {
        console.log('User signed out.');
        // logInBtn.textContent = "Log-In";
        logInBtn.innerHTML = "<h2>Log-In</h2>";
        logInBtn.classList.remove('logged');
    });
}

// 카카오 로그인
// kakao 자바스크립트 키 	8e4d963581654f341f653c31d71cef4e
Kakao.init('8e4d963581654f341f653c31d71cef4e');
Kakao.isInitialized();

const kakaoLoginBtn = document.querySelector('.kakaologin > a > div.kakaologinbtn');
const snsLogInModal = document.querySelector('.snsloginmodal');
console.log(kakaoLoginBtn)
kakaoLoginBtn.addEventListener('click', kakaoLogIn);
function kakaoLogIn(e){
    e.preventDefault();
    Kakao.Auth.login({
        scope: "profile, account_email",
        success: function(authOb){
            console.log(authOb)
            Kakao.API.request({
                url:'/v2/user/me',
                success: response => {
                    const kakao_account = response.kakao_account;
                    console.log(kakao_account);
                    console.dir(kakaoLoginBtn);
                    console.log('카카오 로그인');
                    logInBtn.innerHTML = "<h2>Log-out</h2>";
                    logInBtn.classList.add('logged');
                },
                fail: error =>{ console.log(error);}
            });
        }
    });
    modalclose()
}

// 네이버
// clientId: "0VV7vFVxgUae3jnXIl7l",
// callbackUrl: "http://localhost:81",
// client secret = pCGWbSjKdY
const naverloginBtn = document.querySelector('#naver_id_login')
window.naver_id_login = new naver_id_login("0VV7vFVxgUae3jnXIl7l", "http://localhost:81");
var state = naver_id_login.getUniqState();
// naver_id_login.setButton("green", 3, 45);
naver_id_login.setDomain("http://localhost:81");
naver_id_login.setState(state);
naver_id_login.setPopup();
naver_id_login.init_naver_id_login();
naver_id_login.get_naver_userprofile("naverSignInCallback()");
// console.log(naver_id_login.callback_status)
// console.log(naver_id_login.getAccessToken())

// 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
function naverSignInCallback() {
    if(naver_id_login.getProfileData('email')){
        logInBtn.innerHTML = "<h2>Log-out</h2>";
        logInBtn.classList.add('logged');
    }
    console.log(naver_id_login.getProfileData('email'));
}

function logOut(){
    console.log('로그아웃하기')
    if(Kakao.Auth.getAccessToken()){
        Kakao.Auth.logout(function() {
            console.log('카카오로 로그인된 상태에서 로그아웃합니다')
            logInBtn.innerHTML = "<h2>Log-In</h2>";
            logInBtn.classList.remove('logged')
        });
    }else if(GoogleAuth.isSignedIn.get()){
        console.log('구글로 로그인된 상태에서 로그아웃합니다')
        gLogOut();
    }else if(naver_id_login.getAccessToken()){
        console.log('네이버로 로그인된 상태에서 로그아웃합니다')
        console.log('토큰삭제')
        let naverToken = naver_id_login.getAccessToken();
        // 브라우저에서 토큰 삭제...
        location.replace(`https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=0VV7vFVxgUae3jnXIl7l&client_secret=pCGWbSjKdY&access_token=${naverToken}&service_provider=NAVER`)
        location.replace('http://localhost:81')
        logInBtn.innerHTML = "<h2>Log-In</h2>";
        logInBtn.classList.remove('logged')
        // https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=0VV7vFVxgUae3jnXIl7l&client_secret=pCGWbSjKdY&access_token=`${naverToken}`&service_provider=NAVER
    }
}
// 서버문제 - 프록시서버..
window.addEventListener('load', loggedCheck)
function loggedCheck(){
    // 카카오
    if(Kakao.Auth.getAccessToken()) {
        console.log('kakao logged in.');
        // logInBtn.textContent = "Log-out";
        logInBtn.innerHTML = "<h2>Log-out</h2>";
        logInBtn.classList.add('logged');
    }else{
        console.log('kakao NOt logged in')
    }
    // 네이버
    if(naver_id_login.getAccessToken()){
        logInBtn.innerHTML = "<h2>Log-out</h2>";
        logInBtn.classList.add('logged');
    }else{
        console.log('naver NOt logged in')
    }
    // 구글
    if(GoogleAuth.isSignedIn.get()){
        logInBtn.innerHTML = "<h2>Log-out</h2>";
        logInBtn.classList.add('logged');
    }else{
        console.log('google NOt logged in')
    }
}