(() => {
  const queryString = new URL(document.getElementById("chat-widget-config").src)
    .search;
  const params = new URLSearchParams(queryString);
  const ButtonKeys = params.get("apiKey");
  if (ButtonKeys) {
    const addPlus = ButtonKeys.replace(/ /g, "+");
    const managePlus = encodeURIComponent(addPlus);
    var url =
      "https://192.168.13.30:7079/api/radefy-customer/User/getCustomerByWidgetChatId?widgetId=" +
      managePlus;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":'*',
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (responseData) {
        const apiData = responseData?.getCustomerInfoByWidgetChatIdResponseOut;
        console.log(apiData, "apidata 1234");
        if (apiData) {
          const container = document.createElement("div");
          container.style.position = "fixed";
          container.style.bottom = "20px";
          container.style.right = "20px";
          container.style.zIndex = "999999";
          // container.style.backgroundColor = "#84c24e";
          container.style.width = "48px";
          container.style.height = "48px";
          container.style.borderRadius = "100%";
          container.style.cursor = "pointer";

          // Create the number span
          const numberSpan = document.createElement("span");
          numberSpan.style.backgroundColor = "#000000";
          numberSpan.style.color = "#fff";
          numberSpan.style.padding = "2px 3px";
          numberSpan.style.borderRadius = "100%";
          numberSpan.style.fontWeight = "700";
          numberSpan.style.marginLeft = "auto";
          // numberSpan.style.display = "inline-block";
          numberSpan.style.position = "absolute";
          numberSpan.style.right = "0";
          numberSpan.style.zIndex = "1";
          // numberSpan.innerText = "0";
          numberSpan.style.fontFamily = "sans-serif";
          numberSpan.style.fontSize = "12px";
          numberSpan.style.minWidth = "12px";
          numberSpan.style.textAlign = "center";
          numberSpan.style.display = "none";

          // Create the button
          const button = document.createElement("button");
          button.style.zIndex = "999999";
          button.style.border = "0px";
          button.style.backgroundColor = "rgb(132, 194, 78)";
          button.style.color = "rgb(132, 194, 78)";
          button.style.width = "48px";
          button.style.height = "48px";
          button.style.borderRadius = "100%";
          button.style.boxShadow =
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px";
          button.style.cursor = "pointer";
          button.style.transition = "all 0.3s ease 0s";
          // button.style.backgroundImage = `url(${apiData.logo})`;
          button.style.backgroundImage =
            "url(https://images.mamaearth.in/wysiwyg/ChatIcon12%20Jan.png.png)";
          button.style.backgroundPosition = "center center";
          button.style.backgroundSize = "100%";
          button.style.transform = "scale(1)";
          button.id = "toggleButton";

          // Create an iframe element for the chat module
          const chatIframe = document.createElement("iframe");
          chatIframe.src =
            `${apiData.chatWidgetPortal}/?website_token=` + managePlus; // Replace with your chat module HTML URL
          chatIframe.style.display = "none";
          chatIframe.style.position = "fixed";
          chatIframe.style.bottom = "80px";
          chatIframe.style.right = "20px";
          chatIframe.style.maxWidth = "320px";
          chatIframe.style.width = "100%";
          chatIframe.style.height = "400px";
          chatIframe.style.border = "1px solid #cccccc";
          chatIframe.style.zIndex = "9998";
          chatIframe.style.borderRadius = "14px";

          // Append the number span and button to the container
          container.appendChild(numberSpan);
          container.appendChild(button);
          container.appendChild(chatIframe);
          document.body.appendChild(container);

          button.addEventListener("click", function () {
            // Toggle the display property of the chatIframe
            if (chatIframe.style.display === "none") {
              chatIframe.style.display = "block";
              numberSpan.style.display = "none";
              numberSpan.innerText = "";
              console.log(apiData.chatWidgetPortal, "click 1234");
              chatIframe.contentWindow.postMessage(
                "0",
                apiData.chatWidgetPortal
              );
            } else {
              chatIframe.style.display = "none";
              numberSpan.style.display = "none";
              numberSpan.innerText = "";
            }
          });
          button.addEventListener("mousedown", () => {
            button.style.transform = "scale(0.80)";
          });
          button.addEventListener("mouseup", () => {
            button.style.transform = "scale(1)";
          });
          window.addEventListener("message", function (event) {
            // Check the origin to ensure the message is from a trusted source
            if (
              chatIframe.style.display === "none" &&
              event.data.count !== undefined &&
              event.data.count
            ) {
              console.log(event.data.count, "data count event added 1234");
              numberSpan.style.display = "inline-block";
              numberSpan.innerText = event.data.count;
            } else {
              !!event.data.count &&
                console.log(!!event.data.count, " event.data.count else 1234");
              !!event.data.count &&
                chatIframe.contentWindow.postMessage(
                  "0",
                  apiData.chatWidgetPortal
                );
            }
            console.log("Received message: 1234", event.data);
          });
        }
      })
      .catch((err) => {
        console.error("There was a problem with the fetch operation:", err);
      });
  }
})();
