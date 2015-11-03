
      $(function () {
            $("#datum").datepicker({
                  beforeShow: function () {
                        if (navigator.userAgent.match(/Mobi/)) {
                              return false
                        }
                  },
                  dateFormat: "dd.mm.yy",
                  onClose: function (selectedDate) {

                  }
            });
      });