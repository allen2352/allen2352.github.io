$(() => {
    $('button').on('click', () => {
        let h = +$('#inputHeight').val()
        let w = +$('#inputWeight').val()
        let hh = h / 100
        let bmi = w / (hh * hh)
        $('#outputBMI').val(bmi)
    })
})