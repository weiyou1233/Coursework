function openDB(dbName, version = 1) {
  return new Promise((resolve, reject) => {

    var indexedDB = window.indexedDB
    let db;

    const request = indexedDB.open(dbName, version);

    request.onsuccess = function (e) {
      db = e.target.result;
      console.log("Database opened successfully");
      resolve(db);
    };

    request.onerror = function (e) {
      console.log("Database open error report");
    };

    request.onupgradeneeded = function (e) {
      console.log("onupgradeneeded");
      db = e.target.result;

      var storyStore = db.createObjectStore("Story", {
        keyPath: "id"
      });
      storyStore.createIndex("id", "id", {
        unique: false
      });
      storyStore.createIndex("title", "title", {
        unique: false
      });
      storyStore.createIndex("img", "img", {
        unique: false
      });
      storyStore.createIndex("content", "content", {
        unique: false
      });
      storyStore.createIndex("author", "author", {
        unique: false
      });
      storyStore.createIndex("ctime", "ctime", {
        unique: false
      });

      var chatStore = db.createObjectStore("Chat", {
        keyPath: "id"
      });
      // chatStore.createIndex("storyId", "storyId", {
      //   unique: true
      // });
      chatStore.createIndex("content", "content", {
        unique: false
      });
    };
  });
}

function addData(db, storeName, data) {
  let store = db.transaction([storeName], "readwrite").objectStore(storeName)
  let request = store.add(data);

  request.onsuccess = function (event) {
    console.log("Data written successfully");
  };

  request.onerror = function (event) {
    console.log(event);
    console.log("Data write failure");
  };
}


function getDataByKey(db, storeName, key) {
  return new Promise((resolve, reject) => {
    var store = db.transaction([storeName]).objectStore(storeName);
    var request = store.get(key);

    request.onerror = function (event) {
      console.log("Transaction Failure");
    };

    request.onsuccess = function (event) {
      resolve(request.result);
    };
  });
}


function cursorGetData(db, storeName) {
  let list = [];
  var store = db.transaction([storeName]).objectStore(storeName);
  var request = store.openCursor();
  
  return new Promise((resolve, reject) => {
    request.onsuccess = function (e) {
      var cursor = e.target.result;
      if (cursor) {
        list.push(cursor.value);
        cursor.continue(); 
      } else {
        resolve(list);
      }
    };
  })
}

function updateDB(db, storeName, data) {
  let store = db.transaction([storeName], "readwrite").objectStore(storeName)
  let request = store.put(data);

  request.onsuccess = function () {
    console.log("Data updated successfully");
  };

  request.onerror = function () {
    console.log("Data update failure");
  };
}

