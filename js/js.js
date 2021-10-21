$(function() {
    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: true,
        dotsEach: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplaySpeed: 500,
    });
});
let nav_ul1 = document.getElementById('nav_ul1'),
    nav_ul2 = document.getElementById('nav_ul2'),
    logo = document.getElementById('logo'),
    nav_li = document.querySelectorAll('nav ul li'),
    navbar = document.querySelector('header .header_layer nav');


/*******************************shop cart *********** */
let cart_buttons = document.querySelectorAll('.menu .menubox .price .cart'),
    shopcart = document.querySelector('.shopcart'),
    table = document.querySelector('.shopcart .content table'),
    cart_div = document.querySelector('header .header_layer .shop'),
    cart_icon = document.querySelector('.shopcart .content i'),
    items_num = document.querySelector('header .header_layer .shop .item_num'),
    clarAllItem = document.querySelector('.shopcart .content  .clarAllItem');

cart_icon.addEventListener('click', () => {
    shopcart.style.right = '-100%';

});

cart_div.addEventListener('click', () => {
    shopcart.style.right = '0';

});
//////////////////////
cart_buttons.forEach((btn) => {
    btn.addEventListener('click', addToCart);

});
///////////// clear all items form cart

clarAllItem.addEventListener('click', () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your Item has been deleted.',
                    'success'
                );
                document.querySelectorAll('.shopcart .content table tr').forEach((e) => {
                    e.remove();
                    // up date price function
                    updateTotal();
                    // count items function
                    itemCount();
                });
            }
        })

    })
    //add items to cart
function addToCart(event) {
    let target_item = event.target,
        itemprice = target_item.parentElement.children[0].textContent,
        itemName = target_item.parentElement.parentElement.children[0].textContent,
        itemImage = target_item.parentElement.parentElement.previousElementSibling.children[0].src;
    let cartItem = document.createElement('tr');

    cartItem.classList.add('d-flex', 'mt-4', 'align-items-center');
    cartItem.innerHTML = ` <td class="itemimage"><img src="${itemImage}" alt="" class="imgfluid- rounded-circle mr-2"></td>
    <td class="item_name mr-2">${itemName}</td>
    <td class="item_price ml-2 "><span>Item price: </span><span class="text-white">${itemprice} $</span></td>
    <td class="ml-2"><input type="number" value="1" min="1" id="itemcount"></td>
    <td class="itemtotal_price mx-3"><span>Total price: </span> <span class='total_price text-white'>${itemprice} $</span></td>
    <td class="btn btn-danger ml-0 ml-md-5 removeItem"> Remove</td> `;

    table.appendChild(cartItem);


    let itemcounts = document.querySelectorAll("#itemcount"),
        removeItems = document.querySelectorAll('.removeItem');
    /// total count of one item
    itemcounts.forEach((count) => {
        count.addEventListener('change', countitemsPrice)
    });
    /// remove item
    removeItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your Item has been deleted.',
                        'success'
                    );
                    e.target.parentElement.remove();
                    // up date price function
                    updateTotal();
                    // count items function
                    itemCount();
                }
            })

        })
    });
    // up date price function
    updateTotal();
    // count items function
    itemCount();

}

function countitemsPrice(event) {
    let target_item = event.target,
        count = target_item.value;
    price = target_item.parentElement.parentElement.children[2].children[1].textContent.replace('$', ''),
        itemTotalpric = target_item.parentElement.parentElement.children[4].children[1].textContent = `${count * price}.00 $`;
    updateTotal();
}
/// total of all items price
function updateTotal() {

    let = total_All_ItemsPrice = document.querySelector('.shopcart .totalItemsPrice')
    sumTotal = 0,
        totalitemPrice = document.querySelectorAll('table tr .itemtotal_price .total_price');

    totalitemPrice.forEach((total) => {
        sumTotal += parseInt(total.textContent.replace('$', ''));
    });
    total_All_ItemsPrice.textContent = sumTotal + ' $';
}
//// count of items in the shoping cart
function itemCount() {
    let itemsCount = document.querySelectorAll('table tr');
    items_num.textContent = itemsCount.length;
}
/******************************* end shop cart *********** */
logo.addEventListener('click', () => {
    logo.classList.toggle('toggle_top');
    nav_ul1.classList.toggle('toggle_top');
    nav_ul2.classList.toggle('toggle_top');
});

window.onscroll = (() => {
    if (window.screen.width > 600) {
        if (window.scrollY > 100) {
            navbar.style.background = "rgb(40 40 45)";
            navbar.style.boxShadow = '0px 0px 5px white';
        } else {
            navbar.style.background = "none";
            navbar.style.boxShadow = 'none';

        }
    }

})

/**active classs of nav menu */
nav_li.forEach((e) => {
    e.addEventListener('click', () => {
        nav_li.forEach((el) => {
            el.classList.remove('active')
        })
        e.classList.add('active');
    })
})

////// AOS animation
AOS.init();