module com.example.messageservices {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.messageservices to javafx.fxml;
    exports com.example.messageservices;
}