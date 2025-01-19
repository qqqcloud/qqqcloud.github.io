// 生成随机验证码字符
function generateCaptcha() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha = '';
    for (let i = 0; i < 5; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

// 绘制干扰线
function drawNoiseLines(ctx, canvasWidth, canvasHeight) {
    const lineCount = 3; // 设置干扰线的数量
    for (let i = 0; i < lineCount; i++) {
        const xStart = Math.random() * canvasWidth;
        const yStart = Math.random() * canvasHeight;
        const xEnd = Math.random() * canvasWidth;
        const yEnd = Math.random() * canvasHeight;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)'; // 设置线条颜色，带透明度
        ctx.lineWidth = Math.random() * 2 + 1; // 随机设置线条宽度
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();
    }
}

// 绘制干扰点
function drawNoiseDots(ctx, canvasWidth, canvasHeight) {
    const dotCount = 30; // 设置干扰点的数量
    for (let i = 0; i < dotCount; i++) {
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // 设置点的颜色，带透明度
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2, false); // 随机半径
        ctx.fill();
    }
}

// 绘制验证码
function drawCaptcha(captcha) {
    const canvas = document.getElementById('captcha-canvas');
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 绘制背景
    ctx.fillStyle = 'rgba(240, 240, 240, 0.8)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 添加干扰线和干扰点
    drawNoiseLines(ctx, canvasWidth, canvasHeight);
    drawNoiseDots(ctx, canvasWidth, canvasHeight);

    ctx.font = '28px Arial';
    ctx.fillStyle = '#4d90fe';

    // 设置随机的扭曲效果
    for (let i = 0; i < captcha.length; i++) {
        const x = 15 + i * 18; // 增加字符间隔
        const y = 30 + Math.random() * 5; // 控制字符的y位置
        const angle = Math.random() * 0.5 - 0.25; // 随机角度

        ctx.save(); // 保存当前画布状态
        ctx.translate(x, y); // 将原点移到字符位置
        ctx.rotate(angle); // 旋转画布

        // 绘制字符
        ctx.fillText(captcha.charAt(i), 0, 0);

        ctx.restore(); // 恢复画布状态
    }
}

// 校验验证码
document.getElementById('submit-button').addEventListener('click', function () {
    const input = document.getElementById('captcha-input').value.trim().toLowerCase(); // 将输入转换为小写
    const captcha = document.getElementById('captcha-canvas').dataset.captcha.toLowerCase(); // 将验证码转换为小写

    if (input === captcha) {
        // 验证码正确，跳转到指定页面
        window.location.href = "/%E8%AF%81%E4%B9%A6%E4%BF%A1%E6%81%AF.html"; // 替换为目标页面的路径
    } else {
        // 验证码错误，不弹窗，只是清空输入框
        document.getElementById('captcha-input').value = '';
    }
});

// 初始化
window.onload = function() {
    const captcha = generateCaptcha();
    document.getElementById('captcha-canvas').dataset.captcha = captcha;
    drawCaptcha(captcha);
};
