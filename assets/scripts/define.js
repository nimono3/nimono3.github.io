let El;
El = function (tag, inText = "", style = {}, attr = {}, children = []) {
    this.e = JSON.parse(JSON.stringify({ tag, inText, style, attr }));
    this.children = children;
}
El.prototype.gen = function () {
    const element = document.createElement(this.e.tag);
    if (this.e.inText) element.innerText = this.e.inText;
    Object.keys(this.e.style).map(key => element.style[key] = this.e.style[key]);
    Object.keys(this.e.attr).map(key => element.setAttribute(key, this.e.attr[key]));
    this.children.map(child =>
        child instanceof El ? element.appendChild(child.gen()) :
            child instanceof Element ? element.appendChild(child) :
                typeof child === "string" ? element.innerHTML += child : -1);
    return element;
}
El.prototype.dif = function (obj) {
    return new El(...Object.values({ ...{ ...this.e, children: this.children }, ...obj }));
}
El.appendChildren = function (element, children) {
    [children].flat().map(child =>
        child instanceof El ? element.appendChild(child.gen()) :
            child instanceof Element ? element.appendChild(child) :
                typeof child === "string" ? element.innerHTML += child : -1);
    return;
}
El.prototype.style = function (style) {
    Object.keys(style).map(s => this.e.style[s] = style[s]);
    return this;
}
El.prototype.attr = function (attr) {
    Object.keys(attr).map(a => this.e.attr[a] = attr[a]);
    return this;
}
El.prototype.class = function (class_name) {
    return this.attr({ class: class_name });
}
const breaker = new El("br");
let liner = new El("hr");
const genEnumElement = (gee_link_name, gee_link_url, gee_link_comment, gee_img_objs, gee_attrs = [{}, {}, {}]) =>
    new El("div", "", {}, gee_attrs[0], [
        new El(gee_link_url ? "a" : "text", "", { fontSize: sizes.big }, { class: "enum-link", href: gee_link_url, ...gee_attrs[1] }, [
            new El("span", "|", {}, { class: "roll-text" }),
            gee_link_name
        ]),
        new El("p", "", { fontSize: sizes.medium }, { class: "text", ...gee_attrs[2] }, [gee_link_comment].flat()),
        ...gee_img_objs.map(l =>
            new El("a", "", {}, { href: l.link, target: "_blank", rel: "noopener" }, [
                new El("img", "", { height: view_mode ? "40vw" : "15vw" }, { src: l.image })
            ])
        ),
        breaker
    ]).gen();
let view_size = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
};
let view_mode = (view_size.width < view_size.height);//�c���1, �����0�ŃX�^�C����ύX
let links = {
    "nimono": "./assets/images/nimono.png",
    "nicoExp": "https://github.com/nimono3/nicoExpansion"
};
let images = {
    "nimono": ["./assets/images/nimono.png"],
    "nico": ["./assets/images/nico-logo-256.png", "./assets/images/nico-logo-dark-256.png"],
    "YouTube": ["./assets/images/youtube-white.png", "./assets/images/youtube-red.png"],
    "Twitter": ["./assets/images/Twitter-social-icons-circle-white.png", "./assets/images/Twitter-social-icons-circle-blue.png"],
    "GitHub": ["./assets/images/GitHub-Mark-Light-120px-plus.png", "./assets/images/GitHub-Mark.png"],
    "nicoExp": ["./assets/images/nicoExp01.png"]
};
let sizes = {
    "small": "",
    "medium": view_mode ? "4vw" : "1.5vw",
    "big": view_mode ? "7vw" : "2vw",
    "verybig": "",
    "video": {
        "width": 0,
        "height": 0
    }
};
/*��g===================================================================*/
const layout = () => {
    let page_body = document.body;
    page_body.className = "main-body";
    El.appendChildren(page_body, new El("div", "", { height: view_mode ? "55px" : "36px" }, { class: "main-header", id: "header" }).gen());
    let main_body_container;
    El.appendChildren(page_body, main_body_container = new El("div").attr({ class: "main-body-container", id: "body-container" }).gen());
    if (view_mode) page_body.style.display = "inline";
    if (view_mode) main_body_container.style.display = "inline";
    main_body_container.insertBefore(new El("div", "", {
        width: view_mode ? "80vw" : "20vw",
        marginTop: view_mode ? "0" : "45px",
        marginLeft: view_mode ? "auto" : "0.5vw"
    }, { class: "main-right-container", id: "right-container" }).gen(), main_body_container.firstChild);
    main_body_container.insertBefore(new El("div", "", {
        width: view_mode ? "80vw" : "65vw",
        marginTop: view_mode ? "60px" : "45px",
        marginRight: view_mode ? "auto" : "0.5vw"
    }, { class: "main-main-container", id: "main-container", align: "center" }).gen(), main_body_container.firstChild);
    //if (!view_mode) page_body.appendChild(new El("div", "", {}, { align: "center", class: "main-footer", id: "footer" }).gen());
}