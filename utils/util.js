function e(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

module.exports = {
    formatTime: function (n) {
        if (void 0 != n) {
            n = n.replace(/(\d{4})-(\d{2})-(\d{2})T(.*)?\.(.*)/, "$1/$2/$3 $4");
            var t = (n = new Date(n)).getFullYear(), o = n.getMonth() + 1, r = n.getDate(), i = n.getHours(), u = n.getMinutes(), a = n.getSeconds();
            return [t, o, r].map(e).join("-") + " " + [i, u, a].map(e).join(":");
        }
    },
    json2Form: function (e) {
        var n = [];
        for (var t in e) n.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
        return n.join("&");
    },

    getDate(_date) {
        let date = _date ? new Date(_date) : new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }
        return year + '-' + month + '-' + day;
    }
    ,
    getTime(_time) {
        let date = _time ? new Date(_time) : new Date();
        let Hours = date.getHours();
        let Minutes = date.getMinutes();
        // let Seconds = date.getSeconds();
        if (Hours < 10) {
            Hours = '0' + Hours
        }
        if (Minutes < 10) {
            Minutes = '0' + Minutes
        }
        // if (Seconds.length < 9) {
        //   Seconds = '0' + Seconds
        // }
        return Hours + ':' + Minutes;
    }
};