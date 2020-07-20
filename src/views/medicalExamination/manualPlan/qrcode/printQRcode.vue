<template>
  <div class="print">
    <Modal
      title="打印"
      :value="true"
      :mask-closable="false"
      :width="900"
      footer-hide
      @on-cancel="close"
    >
      <div class="warapper">
        <div class="btn-div">
          <img
            src="../../../../assets/medicalExamination/print.png"
            alt
            style="cursor: pointer"
            class="printImg"
            @click="printOne"
          >
        </div>
        <div class="img-area">
          <template>
            <!--startprint-->
            <section ref="print">
              <div class="qrcode" id="imhg" style="height: 100%">
                  <div style="width: 100%;">
                      <div class="qrImg" v-for="(item,i) in qrcodes" :key="i">
                          <div style="margin-top: 60px;vertical-align:middle; padding: 6px; float:left;">
                              <div :id="item.id" style=""></div>
                              <div style="font-size: 18px;position: relative;top: 5px;right: 5px;">二维码请勿折叠！</div>
                          </div>
                          <div class="baseInfo">
                              <div class="personalInfo">
                                  <p class="school">{{item.dep_name}}</p>
                                  <p class="grade">{{item.grade_name}}{{item.class_name}}</p>
                                  <p class="name">{{item.student_name}}</p>
                                  <p class="cardCode">{{item.card_num}}</p>
                              </div>

                              <div class="tyItem">
                                  <p v-for="(item,i) in tjItems" :key="i"><span class="checkbox"></span>{{item}}</p>
                              </div>
                          </div>

                      </div>
                  </div>

              </div>
            </section>
            <!--endprint-->
          </template>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import printJS from "print-js";

export default {
  name: "printQRcode",
  props: ["id", "title", "flag", "qrcodes"],
  data() {
    return {
      printHtml: "",
      tjItems:['身高、体重','口腔科','血压','外科','眼科','内科','视力','主检收表','屈光度'],
    };
  },
  computed: {
      // total: function () {
      //   return this.qrcodes.length
      // },
      // newQRcodes:function() {
      //   var result = [];
      //   for (var x = 0; x < Math.ceil(this.total / 10); x++) {
      //       var start = x * 10;
      //       var end = start + 10;
      //       result.push(this.qrcodes.slice(start, end));
      //   }
      //   return result;
      // }
    },

  methods: {
    printOne() {
      this.printHtmlCustomStyle();
    },
    printHtmlCustomStyle() {
        let userAgent = navigator.userAgent;
        if (userAgent.indexOf("Firefox") > -1) {
            const style =
                `@page { margin: 30px 0 40px 45px } @media print {
          .qrcode {
            // margin-bottom: 60px;
          }
          .qrcode .baseInfo {
              text-align: left;
              margin-left: 184px;
              padding-left: 40px;
              vertical-align: top;
              margin-bottom:2px;
          }
          .baseInfo .personalInfo {
              display: flex;
              flex-flow: row wrap;
              align-content: flex-start;
          }
          .personalInfo p {
            flex: 0 0 50%;
            font-size: 15px;
            font-weight: 700;
            margin:5px 0;
            padding:0;
          }
          .personalInfo .school,.personalInfo .name {
             flex: 0 0 65%;
           }
          .personalInfo .grade,.personalInfo .cardCode {
             flex: 0 0 35%;
           }
          .tyItem {
            margin-top: 6px;
            display: flex;
            flex-flow: row wrap;
            align-content: flex-start;
          }
          .tyItem p {
            flex: 0 0 50%;
            margin-bottom: 10px;
          }
          .tyItem span.checkbox {
              display: inline-block;
              vertical-align: middle;
              margin-right: 10px;
              width: 16px;
              height: 16px;
              border: 1px solid #434343;
              border-radius: 4px;
              background-color: #EEEEEE;
            }
          .qrcode .qrImg {
              width: 100%;
              padding-top: 10px;
              border-bottom: 1px solid #ccc;
          }
          .qrcode .qrImg:last-child {
              margin-bottom: 0px;
              // border-bottom: 0 none;
          }
          .qrImg:nth-child(3n) {
            border-color: transparent;
          }

        }`;

            printJS({
                printable: "imhg",
                type: "html",
                style: style,
                scanStyles: false,
                targetStyles: ['*']
            });
        }

        if (userAgent.indexOf("Chrome") > -1) {
            const style =
                `@page { margin: 30px 0 40px 45px } @media print {
          .qrcode {
            // margin-bottom: 60px;
          }
          .qrcode .baseInfo {
              text-align: left;
              margin-left: 184px;
              padding-left: 40px;
              vertical-align: top;
              margin-bottom:2px;
          }
          .baseInfo .personalInfo {
              display: flex;
              flex-flow: row wrap;
              align-content: flex-start;
          }
          .personalInfo p {
            flex: 0 0 50%;
            font-size: 15px;
            font-weight: 700;
            margin:5px 0;
            padding:0;
          }
          .personalInfo .school,.personalInfo .name {
             flex: 0 0 65%;
           }
          .personalInfo .grade,.personalInfo .cardCode {
             flex: 0 0 35%;
           }
          .tyItem {
            margin-top: 6px;
            display: flex;
            flex-flow: row wrap;
            align-content: flex-start;
          }
          .tyItem p {
            flex: 0 0 50%;
            margin-bottom: 15px;
          }
          .tyItem span.checkbox {
              display: inline-block;
              vertical-align: middle;
              margin-right: 10px;
              width: 16px;
              height: 16px;
              border: 1px solid #434343;
              border-radius: 4px;
              background-color: #EEEEEE;
            }
          .qrcode .qrImg {
              width: 100%;
              padding-top: 10px;
              border-bottom: 1px solid #ccc;
          }
          .qrcode .qrImg:last-child {
              margin-bottom: 0px;
              // border-bottom: 0 none;
          }
          .qrImg:nth-child(3n) {
            border-color: transparent;
          }

        }`;

            printJS({
                printable: "imhg",
                type: "html",
                style: style,
                scanStyles: false,
                targetStyles: ['*']
            });
        }
    },
     close() {
      this.$emit("modal-close");
    }

  },
  mounted() {
  },
};
</script>
<style scoped lang="less">
.warapper {
  display: flex;
  align-items: stretch;

  .btn-div {
    width: 80px;
    position: relative;
    .printImg {

    }

    .img-page {
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;

      .left {
        position: relative;
        top: 3px;
        float: left;
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-right: 10px solid #afb0b3;
        border-bottom: 6px solid transparent;
        border-left: 0 solid transparent;
        cursor: pointer;
      }

      .right {
        position: relative;
        top: 3px;
        float: right;
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-left: 10px solid #afb0b3;
        border-bottom: 6px solid transparent;
        border-right: 0 solid transparent;
        cursor: pointer;
      }
    }
  }

  .img-area {
    height: 100%;
    max-height: 760px;
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1;
    padding-left: 40px;
    margin-top: -21px;
    padding-bottom: 40px;
    .qrcode {
      .qrcode_item {
        width: 50%;
        height: 200px;
        position: relative;
        div {
          position: absolute;
          top: 0;
          left: 0;
        }
        .content {
          top: 20px;
          left: 220px;
        }
      }
      p {
        font-size: 14px;
      }
      .baseInfo {
        text-align: left;
        margin-left: 184px;
        padding-left: 40px;
        vertical-align: top;
        .personalInfo {
          display: flex;
          flex-flow: row wrap;
          align-content: flex-start;
          p {
            flex: 0 0 50%;
            font-size: 15px;
            font-weight: 700;
          }
           .school,.name {
             flex: 0 0 65%;
           }
           .grade,.cardCode {
             flex: 0 0 35%;
           }
        }
        .tyItem {
          margin-top: 20px;
          display: flex;
          flex-flow: row wrap;
          align-content: flex-start;
          p {
            flex: 0 0 50%;
            margin-bottom: 25px;
            span.checkbox {
              display: inline-block;
              vertical-align: middle;
              margin-right: 10px;
              width: 16px;
              height: 16px;
              border: 1px solid #434343;
              border-radius: 4px;
              background-color: #EEEEEE;
            }
          }

        }
      }
      .qrImg {
        width: 100%;
        // height:400px;
        padding-top: 20px;
        border-top: 1px solid #ccc;
        overflow:hidden;
      }
      .qrImg:first-child {
        border-top: 0 none;

      }
    }

    img {
      display: block;
      width: 100%;
    }
  }
}
</style>

