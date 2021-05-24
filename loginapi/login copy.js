let gClientID = '126508767249-438g3lig10tl2btavufc3npkjp75pt9k.apps.googleusercontent.com'
const goolgeloginBtn = document.querySelector('#goolgeloginbtn')
console.log(goolgeloginBtn)
// var googleAuth
function init() {
    console.log('init')
    gapi.load('auth2', function() {
        /* Ready. Make a call to gapi.auth2.init or some other API */
        console.log('auth2');
        console.log(gapi.auth2);
        window.GoogleAuth = gapi.auth2.init({
            client_id: gClientID,
            scope: 'profile email'
        });
        // googleAuth를 잘 가져왔음.
        console.log(GoogleAuth)
        GoogleAuth.then(function (){
            console.log('googlesuccess')
            if(GoogleAuth.isSignedIn.get()){
                console.log('logged')
                // 새로고침했을 때 로그인되어 있음
                logInBtn.textContent = "Log-out";
                logInBtn.classList.add('logged');
            }else{
                console.log('goolge not logged')
            }
        }, function (){
            console.log('googleAuth failed')
        });
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
        logInBtn.textContent = "Log-out";
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
        logInBtn.textContent = "Log-In";
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
    console.log('로그인');
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
                    logInBtn.textContent = "Log-out";
                    logInBtn.classList.add('logged');
                },
                fail: error =>{ console.log(error);}
            });
        }
    });
    modalclose()
}

// 네이버

window.naverLogin = new naver.LoginWithNaverId(
    {
        clientId: "0VV7vFVxgUae3jnXIl7l",
        callbackUrl: "http://localhost:81",
        isPopup: false, /* 팝업을 통한 연동처리 여부 */
        loginButton: {color: "green", type: 3, height: 45} /* 로그인 버튼의 타입을 지정 */
    }
);
/* 설정정보를 초기화하고 연동을 준비 */
naverLogin.init();

window.addEventListener('load', loggedCheck)
function loggedCheck(){
    console.log('윈도우로드새로고침')
    // 카카오
    if(Kakao.Auth.getAccessToken()) {
        console.log('kakao logged in.');
        logInBtn.textContent = "Log-out";
        logInBtn.classList.add('logged');
    }else{
        console.log('kakao NOt logged in')
    }
    // 네이버
    const nLoginBtnImg = document.querySelector('#naverIdLogin_loginButton > img')
    nLoginBtnImg.src = ' ';
    console.dir(nLoginBtnImg)

    naverLogin.getLoginStatus(function (status) {
        if (status) {
            /* (5) 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크 */
            var email = naverLogin.user.getEmail();
            // var userID = naverLogin.user.getId();
            var name = naverLogin.user.getName();
            // var profileImage = naverLogin.user.getProfileImage();
            console.log(status)
            console.log(name)
            console.log(email)
            // console.log(profileImage)
            logInBtn.textContent = "Log-out";
            logInBtn.classList.add('logged');
            nLoginBtnImg.currentSrc = './images/2014_Login_with_NAVER_button_png/네이버 아이디로 로그인_아이콘형_Green.PNG'
            console.dir(nLoginBtnImg.currentSrc)
            // if( email == undefined || email == null) {
            //     alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
            //     /* (5-1) 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함 */
            //     naverLogin.reprompt();
            //     return;
            // }
            // window.location.replace("http://" + window.location.hostname + ( (location.port==""||location.port==undefined)?"":":" + location.port) + "/sample/main.html");
        } else {
            console.log("callback 처리에 실패하였습니다.");
        }
    });

}


function logOut(){
    // if (!Kakao.Auth.getAccessToken()) {
    //     console.log('Not logged in.');
    //     return;
    // }
    console.log('로그아웃하기')
    console.log(naverLogin.loginStatus.status)
    if(Kakao.Auth.getAccessToken()){
        Kakao.Auth.logout(function() {
            console.log('카카오로 로그인된 상태에서 로그아웃합니다')
            logInBtn.textContent ="Log-in"
            logInBtn.classList.remove('logged')
        });
    }else if(GoogleAuth.isSignedIn.get()){
        console.log('구글로 로그인된 상태에서 로그아웃합니다')
        gLogOut();
    }else if(naverLogin.loginStatus.status){
        console.log('네이버로 로그인된 상태에서 로그아웃합니다')
        logInBtn.textContent ="Log-in"
        logInBtn.classList.remove('logged')
        naverLogin.logout();
        // location.replace('/oauth/sample/javascript_sample.html');
    }
}
