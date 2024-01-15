document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".menu__item");
    let targetX = 0;
    let targetY = 0;
    const followSpeed = 0.07; // Vitesse de suivi de l'image

    menuItems.forEach((item, index) => {
        const img = item.querySelector(".menu__item-img");

        item.addEventListener("mousemove", (e) => {
            const rect = item.getBoundingClientRect();
            targetX = e.clientX - rect.left;
            targetY = e.clientY - rect.top;

            if (index === 0) {
                targetY += 27; // Décale légèrement pour le premier élément
            } else if (index < 2) {
                targetY -= 127; // Décale légèrement pour les deux premiers éléments
            } else if (index >= menuItems.length - 3) {
                targetY -= 150; // Décale légèrement pour les trois derniers éléments
                targetX += 20;
            }

            img.style.opacity = 1;
            img.classList.add("show"); // Ajoute la classe "show" pour l'effet de "boom"
        });

        item.addEventListener("mouseleave", () => {
            img.style.opacity = 0;
            img.classList.remove("show"); // Retire la classe "show" pour réinitialiser l'effet
        });
    });

    // Fonction d'animation pour le suivi de la souris
    function animate() {
        menuItems.forEach((item) => {
            const img = item.querySelector(".menu__item-img");
            const currentX = parseFloat(img.style.left, 10) || 0;
            const currentY = parseFloat(img.style.top, 10) || 0;

            // Appliquez une transition lisse à la position de l'image
            img.style.left = `${currentX + (targetX - currentX) * followSpeed}px`;
            img.style.top = `${currentY + (targetY - currentY) * followSpeed}px`;
        });

        // Continuez l'animation
        requestAnimationFrame(animate);
    }

    // Commencez l'animation de suivi de la souris
    animate();
});




document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".contact-form");
    form.onsubmit = function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        fetch("send_email.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById("popup-message").textContent = data;
            document.getElementById("popup2").style.display = "block";
            setTimeout(() => {
                document.getElementById("popup2").style.display = "none";
            }, 1500);
        })
        .catch((error) => {
            document.getElementById("popup-message").textContent = "Erreur lors de l'envoi du message.";
            document.getElementById("popup2").style.display = "block";
            setTimeout(() => {
                document.getElementById("popup2").style.display = "none";
            }, 1500);
        });
    };
});


window.addEventListener('DOMContentLoaded', (event) => {
    gsap.from('.title', { duration: 0.6, x: -100, opacity: 0, ease: 'power3.out' });
    gsap.from('.role', { duration: 0.6, x: 100, opacity: 0, ease: 'power3.out', delay: 0.2 });
    gsap.from('.stage-availability', { duration: 0.6, y: 100, opacity: 0, ease: 'power3.out', delay: 0.4 });
    gsap.from('.social-links a', { duration: 0.6, y: 100, opacity: 0, stagger: 0.2, ease: 'power3.out', delay: 0.6 });
});





document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.menu__item').forEach(item => {
        item.addEventListener('click', function() {
            var modalId = this.getAttribute('data-modal'); // Récupère l'ID de la modale
            var modal = document.getElementById(modalId); // Trouve la modale avec cet ID
            if (modal) {
                modal.style.display = 'flex';
                modal.querySelector('.modal-content').classList.add('modal-boom'); // Ajoute l'animation
                document.body.classList.add('no-scroll');
            }
        });
    });

    document.querySelectorAll('.close-modal').forEach(closeButton => {
        closeButton.addEventListener('click', function() {
            var modal = this.closest('.full-screen-modal');
            modal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        });
    });

    document.querySelectorAll('.full-screen-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }
        });
    });
});


var codeSnippets = {
    edutask: `// Votre code PHP pour EduTask`,
    portfolio: `// Votre code JavaScript pour Portfolio`,
    // Ajoutez d'autres extraits de code ici
};

document.addEventListener("DOMContentLoaded", function () {
    // Ouvrir la modal et initialiser CodeMirror
    function openModal(modalId, codeSnippetKey) {
        var modal = document.getElementById(modalId);
        var editorContainerId = 'codeEditor' + codeSnippetKey;
        var editorContainer = document.getElementById(editorContainerId);

        modal.style.display = 'flex';
        modal.querySelector('.modal-content').classList.add('modal-boom');
        document.body.classList.add('no-scroll');

        CodeMirror(editorContainer, {
            value: codeSnippets[codeSnippetKey],
            mode: 'php', // Changez selon le type de code
            theme: 'default',
            lineNumbers: true,
            readOnly: true
        });
    }

    // Attacher l'événement click pour ouvrir les modals
    document.querySelectorAll('.menu__item').forEach(item => {
        item.addEventListener('click', function() {
            var modalId = this.getAttribute('data-modal');
            var codeSnippetKey = this.getAttribute('data-code-snippet');
            openModal(modalId, codeSnippetKey);
        });
    });

    // Fermer la modal et nettoyer CodeMirror
    document.querySelectorAll('.close-modal').forEach(closeButton => {
        closeButton.addEventListener('click', function() {
            var modal = this.closest('.full-screen-modal');
            modal.style.display = 'none';
            document.body.classList.remove('no-scroll');
            var codeEditor = modal.querySelector('.CodeMirror');
            if (codeEditor) {
                codeEditor.CodeMirror.toTextArea();
            }
        });
    });

    // Fermer la modal en cliquant en dehors
    document.querySelectorAll('.full-screen-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.classList.remove('no-scroll');
                var codeEditor = this.querySelector('.CodeMirror');
                if (codeEditor) {
                    codeEditor.CodeMirror.toTextArea();
                }
            }
        });
    });
});













document.addEventListener("DOMContentLoaded", function () {
    // Ouvrir la modale de la compétence correspondante
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('click', function() {
            var skillName = this.querySelector('span').textContent;
            var modalId = "modal" + skillName;
            var modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
                modal.querySelector('.modal-content').classList.add('modal-boom');
                document.body.classList.add('no-scroll');
            }
        });
    });

    // Fermer la modale
    document.querySelectorAll('.close-modal').forEach(closeButton => {
        closeButton.addEventListener('click', function() {
            var modal = this.closest('.full-screen-modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Fermer la modale en cliquant en dehors
    document.querySelectorAll('.full-screen-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }
        });
    });
});



