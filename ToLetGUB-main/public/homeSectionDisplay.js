for(let i=1;i<=5;i++){

const newTag = document.createElement("div");

newTag.innerHTML=`<div class="contentBoxService">
          <a href="/service1">
            <div class="service" class="service1">
              <div class="serviceHead"></div>
              <div class="serviceRent">
                <p style="color: rgba(0, 0, 0, 0.648)">
                  ------- Rent Renge -------
                </p>
                <h2>${i} - ${i+500}</h2>
              </div>
              <div class="serviceAvailable">
                Available :
                <div class="availableCount">3</div>
              </div>
          </a>
        </div>
      </div>`;

const node = document.querySelector(".contentBox");
node.after(newTag);
}