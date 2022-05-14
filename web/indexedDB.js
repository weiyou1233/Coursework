function openDB(dbName, version = 1) {
  return new Promise((resolve, reject) => {

    var indexedDB = window.indexedDB
    let db;

    const request = indexedDB.open(dbName, version);

    request.onsuccess = function (e) {
      db = e.target.result;
      console.log("数据库打开成功");
      resolve(db);
    };

    request.onerror = function (e) {
      console.log("数据库打开报错");
    };

    request.onupgradeneeded = function (e) {
      console.log("onupgradeneeded");
      db = e.target.result; // 数据库对象

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
      storyStore.createIndex("id", "id", {
        unique: true
      });
      chatStore.createIndex("storyId", "storyId", {
        unique: true
      });
      chatStore.createIndex("content", "content", {
        unique: false
      });
    };
  });
}

function addData(db, storeName, data) {
  let store = db.transaction([storeName], "readwrite").objectStore(storeName) // 仓库对象
  let request = store.add(data);

  request.onsuccess = function (event) {
    console.log("数据写入成功");
  };

  request.onerror = function (event) {
    console.log(event);
    console.log("数据写入失败");
  };
}


function getDataByKey(db, storeName, key) {
  return new Promise((resolve, reject) => {
    var store = db.transaction([storeName]).objectStore(storeName); // 仓库对象
    var request = store.get(key); // 通过主键获取数据

    request.onerror = function (event) {
      console.log("事务失败");
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
    console.log("数据更新成功");
  };

  request.onerror = function () {
    console.log("数据更新失败");
  };
}

