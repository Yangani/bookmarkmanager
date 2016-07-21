var connection = require('./connection');

function Bookmarks() {
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from bookmarks', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.add = function(bookmark, res) {
    connection.acquire(function(err, con) {
      con.query('insert into bookmarks set ?', bookmark, function(err, result) {
        con.release();
        if (err) {
          res.send('Failed to add article');
        } else {
          res.send("Successful");
        }
      });
    });
  };

  this.update = function(bookmark, res) {
    connection.acquire(function(err, con) {
      con.query('update bookmarks set ? where url = ?', [bookmark, bookmark.url], function(err, result) {
        con.release();
        if (err) {
          res.send('Failed to update');
        } else {
          res.send('Updated successfully');
        }
      });
    });
  };

  this.delete = function(url, res) {
    connection.acquire(function(err, con) {
      con.query('delete from bookmarks where url = ?', [url], function(err, result) {
        con.release();
        if (err) {
          res.send('Failed to delete');
        } else {
          res.send('Deleted successfully');
        }
      });
    });
  };
}

module.exports = new Bookmarks();