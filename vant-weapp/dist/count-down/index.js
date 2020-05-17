import { VantComponent } from '../common/component';
import { isSameSecond, parseFormat, parseTimeData } from './utils';
function simpleTick(fn) {
    return setTimeout(fn, 30);
}
VantComponent({
    props: {
        useSlot: Boolean,
        millisecond: Boolean,
        time: {
            type: Number,
            observer: 'reset'
        },
        format: {
            type: String,
            value: 'HH:mm:ss'
        },
        autoStart: {
            type: Boolean,
            value: true
        }
    },
    data: {
        timeData: parseTimeData(0),
        formattedTime: '0',
        day:0,
        shi:[],
        fen:[],
        miao:[]
    },
    destroyed() {
        clearTimeout(this.tid);
        this.tid = null;
    },
    methods: {
        // 开始
        start() {
            if (this.counting) {
                return;
            }
            this.counting = true;
            this.endTime = Date.now() + this.remain;
            this.tick();
        },
        // 暂停
        pause() {
            this.counting = false;
            clearTimeout(this.tid);
        },
        // 重置
        reset() {
            this.pause();
            this.remain = this.data.time;
            this.setRemain(this.remain);
            if (this.data.autoStart) {
                this.start();
            }
        },
        tick() {
            if (this.data.millisecond) {
                this.microTick();
            }
            else {
                this.macroTick();
            }
        },
        microTick() {
            this.tid = simpleTick(() => {
                this.setRemain(this.getRemain());
                if (this.remain !== 0) {
                    this.microTick();
                }
            });
        },
        macroTick() {
            this.tid = simpleTick(() => {
                const remain = this.getRemain();
                if (!isSameSecond(remain, this.remain) || remain === 0) {
                    this.setRemain(remain);
                }
                if (this.remain !== 0) {
                    this.macroTick();
                }
            });
        },
        getRemain() {
            return Math.max(this.endTime - Date.now(), 0);
        },
        setRemain(remain) {
            this.remain = remain;
            const timeData = parseTimeData(remain);
            if (this.data.useSlot) {
                this.$emit('change', timeData);
            }
            // console.log(parseFormat(this.data.format, timeData),22222)
            let time=parseFormat(this.data.format, timeData),data=this.data
            let a= time.split('天')[1].split(':')[0]
            console.log(      a[2],'222222')
            data.shi[0]=time.split('天')[1].split(':')[0][1]
            data.shi[1]=time.split('天')[1].split(':')[0][2]
            data.fen[0]=time.split('天')[1].split(':')[1][1]
            data.fen[1]=time.split('天')[1].split(':')[1][2]
            data.miao[0]=time.split('天')[1].split(':')[2][1]
            data.miao[1]=time.split('天')[1].split(':')[2][2]
            this.setData({
                formattedTime: parseFormat(this.data.format, timeData),
                day:time.split('天')[0],
                shi:data.shi,
                fen:data.fen,
                miao:data.miao
            });
            if (remain === 0) {
                this.pause();
                this.$emit('finish');
            }
        }
    }
});
