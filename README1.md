BỐ CỤC FOLDER :
Folder Container : Chứa các component render (ví dụ: Home page,...)
Folder store : G:\FullStack\FrontendReactjs\src\store
    + Chứa action và reducer của REDUX

#38 
    G:\FullStack\FrontendReactjs\src\containers\Header\menuApp.js
    --> Khai bao menu động nghĩa là sao (video 6:29)
        Khai báo menu phân quyền ??

#40
    Video 21:55 ==> Modal cua BootStrap4 
    Video 24:43 ==> Giới thiệu thư viện ReactStrap ==> Modals
    https://deploy-preview-2356--reactstrap.netlify.app/components/modals/

#41
    Video 4x:xx, ModelUser.js ==> Tips: cách viết reuse code handleOnChangeInput cho nhiều biến state

#42
    Emitter (event) : Clear input Modal User (trao đổi event qua lại giữa parent & child)
    ==> config : G:\FullStack\FrontendReactjs\src\utils\emitter.js
        
        Fire : child --> parent (event child muốn tác động đến State của parent)
        ==> dùng func props của parent đã truyền xuống child

        Fire : parent --> child (event parent muốn tác động đến State của child)
        ==> ref ?? (React advance)==> Tìm hiểu sau....
        ==> C2 : dùng emitter của Nodejs ( Video 16:29)
            emitter : 1 publisher phát event (Fire event)
                      nhieu subcriber (dky với publisher)  nhận event (lắng nghe events)

#53
    Tại sao App.js : bên ngoài thẻ Switch cần bọc thẻ Router, mà System.js thẻ Switch không bọc gì                      

        
