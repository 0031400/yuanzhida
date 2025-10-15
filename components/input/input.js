Component({
  data: {
    key: 'key',
    label: '',
    value: '',
    placeholder: '请输入',
    multiLine: false,
    password: false
  },
  methods: {
    onInput: function (e) {
      this.setData({ value: e.detail.value.trim() })
      this.trigger()
    },
    trigger: function () {
      this.triggerEvent('input', { 'key': this.data.key, 'value': this.data.value })
    },
    clear: function () {
      this.setData({ value: '' })
    },
    initData: function (d) {
      // d = { value: 'value', key: 'key' }
      this.setData(d)
      this.trigger()
    }
  }
})