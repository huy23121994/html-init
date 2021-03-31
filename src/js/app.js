const API = "https://staging-krystal-api.knstats.com";
new Vue({
  el: "#referral",
  data: {
    choseRate: 75,
    address: "",
    error: "",
    referralCode: [],
  },
  methods: {
    selectRate: function (rate) {
      this.choseRate = rate;
    },
    handleSubmit: function (e) {
      e.preventDefault();
      if (!validateInputAddresses(this.address)) {
        this.error = "Invalid address!";
      } else {
        fetch(`${API}/v1/account/referralCode?address=${this.address}`)
          .then((res) => res.json())
          .then((data) => {
            this.referralCode = data.referralCodes;
          });
      }
    },
    handleChange: function () {
      this.error = "";
    },
  },
  computed: {
    code: function () {
      let index = this.referralCode.findIndex((v) => v.ratio == this.choseRate * 100);
      if(index !== -1) {
        return this.referralCode[index].referralCode
      } else {
        return ""
      }
    },
  },
});

new Vue({
  el: '#saving-service',
  data: {
    data: []
  },
  mounted: function() {
    fetch(`${API}/v1/lending/overview`)
    .then((res) => res.json())
    .then((data) => {
      if (data.result) {
        this.data = data.result.map(token => {
          return {
            symbol: token.symbol,
            apy: token.overview.sort((a,b) => b.supplyRate - a.supplyRate)[0].supplyRate
          }
        })
      }
    });
  }
})

$(function () {
  $('[data-toggle="tooltip"]').tooltip();

  $(".navbar-bars").click(function () {
    $(".navbar-main").addClass("active");
  });
  $(".navbar-main .close-icon").click(function () {
    $(".navbar-main").removeClass("active");
  });
});

$(".download").each(function () {
  new Vue({
    el: $(this)[0],
    data: {
      mobileOperatingSystem: null,
    },
    mounted: function () {
      if (window.innerWidth < 500) {
        this.mobileOperatingSystem = getMobileOperatingSystem();
      }
    },
  });
});

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}

function validateInputAddresses(address) {
  return /^(0x){1}[0-9a-fA-F]{40}$/i.test(address);
}
