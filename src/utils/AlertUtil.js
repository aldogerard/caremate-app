import Swal from "sweetalert2";

export const Success = (prompt) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });
    Toast.fire({
        icon: "success",
        title: prompt,
    });
};

export const Failed = (prompt) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: prompt,
    });
};
