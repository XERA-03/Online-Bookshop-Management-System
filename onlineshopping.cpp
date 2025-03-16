#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include <sstream>
#include <iomanip>

using namespace std;

struct Book {
    int id;
    string title, author;
    double price;
    int stock;
};

struct User {
    int id;
    string name, email;
    bool blocked;
};

struct Order {
    int id, bookId, quantity, userId;
    string status;
};

vector<Book> books;
vector<User> users;
vector<Order> orders;
int bookCounter = 1, userCounter = 1, orderCounter = 1;

void separator() {
    cout << "------------------------------------------------------------\n";
}

// ---------------------- File Handling Functions ------------------------

void saveBooksToFile() {
    ofstream file("books.txt");
    for (auto &b : books)
        file << b.id << "," << b.title << "," << b.author << "," << b.price << "," << b.stock << "\n";
    file.close();
}

void loadBooksFromFile() {
    ifstream file("books.txt");
    if (!file) return;
    books.clear();
    string line;
    while (getline(file, line)) {
        stringstream ss(line);
        Book b;
        string temp;
        getline(ss, temp, ','); b.id = stoi(temp);
        getline(ss, b.title, ',');
        getline(ss, b.author, ',');
        getline(ss, temp, ','); b.price = stod(temp);
        getline(ss, temp, ','); b.stock = stoi(temp);
        books.push_back(b);
        bookCounter = b.id + 1;
    }
    file.close();
}

void saveUsersToFile() {
    ofstream file("users.txt");
    for (auto &u : users)
        file << u.id << "," << u.name << "," << u.email << "," << u.blocked << "\n";
    file.close();
}

void loadUsersFromFile() {
    ifstream file("users.txt");
    if (!file) return;
    users.clear();
    string line;
    while (getline(file, line)) {
        stringstream ss(line);
        User u;
        string temp;
        getline(ss, temp, ','); u.id = stoi(temp);
        getline(ss, u.name, ',');
        getline(ss, u.email, ',');
        getline(ss, temp, ','); u.blocked = stoi(temp);
        users.push_back(u);
        userCounter = u.id + 1;
    }
    file.close();
}

void saveOrdersToFile() {
    ofstream file("orders.txt");
    for (auto &o : orders)
        file << o.id << "," << o.bookId << "," << o.quantity << "," << o.userId << "," << o.status << "\n";
    file.close();
}

void loadOrdersFromFile() {
    ifstream file("orders.txt");
    if (!file) return;
    orders.clear();
    string line;
    while (getline(file, line)) {
        stringstream ss(line);
        Order o;
        string temp;
        getline(ss, temp, ','); o.id = stoi(temp);
        getline(ss, temp, ','); o.bookId = stoi(temp);
        getline(ss, temp, ','); o.quantity = stoi(temp);
        getline(ss, temp, ','); o.userId = stoi(temp);
        getline(ss, o.status, ',');
        orders.push_back(o);
        orderCounter = o.id + 1;
    }
    file.close();
}

// ---------------------- Management Functions ------------------------

void dashboardOverview() {
    separator();
    cout << "Dashboard Overview\n";
    separator();
    cout << "Total Books: " << books.size() << "\nTotal Users: " << users.size() << "\nTotal Orders: " << orders.size() << "\n";
    separator();
}

void addBook() {
    Book b;
    b.id = bookCounter++;
    cout << "Enter Title: "; cin.ignore(); getline(cin, b.title);
    cout << "Enter Author: "; getline(cin, b.author);
    cout << "Enter Price: "; cin >> b.price;
    cout << "Enter Stock: "; cin >> b.stock;
    books.push_back(b);
    saveBooksToFile();
    cout << "Book added!\n";
}

void listBooks() {
    separator();
    cout << setw(5) << "ID" << setw(20) << "Title" << setw(20) << "Author" << setw(10) << "Price" << setw(10) << "Stock\n";
    for (auto &b : books)
        cout << setw(5) << b.id << setw(20) << b.title << setw(20) << b.author << setw(10) << b.price << setw(10) << b.stock << endl;
    separator();
}

void addUser() {
    User u;
    u.id = userCounter++;
    cout << "Enter Name: "; cin.ignore(); getline(cin, u.name);
    cout << "Enter Email: "; getline(cin, u.email);
    u.blocked = false;
    users.push_back(u);
    saveUsersToFile();
    cout << "User Registered!\n";
}

void listUsers() {
    separator();
    cout << setw(5) << "ID" << setw(20) << "Name" << setw(30) << "Email" << setw(10) << "Status\n";
    for (auto &u : users)
        cout << setw(5) << u.id << setw(20) << u.name << setw(30) << u.email << setw(10) << (u.blocked ? "Blocked" : "Active") << endl;
    separator();
}

void placeOrder() {
    Order o;
    o.id = orderCounter++;
    cout << "Enter Book ID: "; cin >> o.bookId;
    cout << "Enter Quantity: "; cin >> o.quantity;
    cout << "Enter User ID: "; cin >> o.userId;
    o.status = "Pending";
    orders.push_back(o);
    saveOrdersToFile();
    cout << "Order placed!\n";
}

void listOrders() {
    separator();
    cout << setw(5) << "ID" << setw(8) << "Book ID" << setw(10) << "Quantity" << setw(10) << "User ID" << setw(15) << "Status\n";
    for (auto &o : orders)
        cout << setw(5) << o.id << setw(8) << o.bookId << setw(10) << o.quantity << setw(10) << o.userId << setw(15) << o.status << endl;
    separator();
}

// ---------------------- Coming Soon Sections ------------------------

void paymentsSection() { cout << "Payments & Transactions (Coming Soon!)\n"; }
void reportsSection() { cout << "Reports & Analytics (Coming Soon!)\n"; }
void messagesSection() { cout << "Messages & Notifications (Coming Soon!)\n"; }
void settingsSection() { cout << "Settings (Coming Soon!)\n"; }

// ---------------------- Menu ------------------------

void displayMenu() {
    separator();
    cout << "Bookstore Management System\n";
    separator();
    cout << "1. Dashboard Overview\n";
    cout << "2. Add Book\n";
    cout << "3. List Books\n";
    cout << "4. Add User\n";
    cout << "5. List Users\n";
    cout << "6. Place Order\n";
    cout << "7. List Orders\n";
    cout << "8. Payments & Transactions\n";
    cout << "9. Reports & Analytics\n";
    cout << "10. Messages & Notifications\n";
    cout << "11. Settings\n";
    cout << "12. Exit\n";
    separator();
    cout << "Choose option: ";
}

// ---------------------- Main ------------------------

int main() {
    loadBooksFromFile();
    loadUsersFromFile();
    loadOrdersFromFile();

    int choice;
    do {
        displayMenu();
        cin >> choice;
        switch (choice) {
            case 1: dashboardOverview(); break;
            case 2: addBook(); break;
            case 3: listBooks(); break;
            case 4: addUser(); break;
            case 5: listUsers(); break;
            case 6: placeOrder(); break;
            case 7: listOrders(); break;
            case 8: paymentsSection(); break;
            case 9: reportsSection(); break;
            case 10: messagesSection(); break;
            case 11: settingsSection(); break;
            case 12: cout << "Exiting... Thank you!\n"; break;
            default: cout << "Invalid choice!\n";
        }
    } while (choice != 12);
    return 0;
}