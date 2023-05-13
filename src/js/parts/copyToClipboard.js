const copy = document.querySelector('#copy_password');
const tooltip = document.querySelector('.tooltip');

function copyToClipboard() {
    var output = document.querySelector('.password');
    navigator.clipboard.writeText(output.innerHTML);
    tooltip.classList.add('show');
    setTimeout(function() {
        tooltip.classList.remove('show');
    }, 2500);
}

copy.addEventListener('click', copyToClipboard);