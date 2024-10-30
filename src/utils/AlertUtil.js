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

export const Logout = (cb) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You want logout!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: "success",
                text: "You already logout",
            });
            cb();
        }
    });
};
