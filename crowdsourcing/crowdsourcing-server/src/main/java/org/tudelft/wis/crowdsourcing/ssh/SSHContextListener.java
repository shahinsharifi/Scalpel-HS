package org.tudelft.wis.crowdsourcing.ssh;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;


@Component
public class SSHContextListener implements ServletContextListener {


    @Autowired
    private SSHConnection sshConnection;


    public SSHContextListener() {
        super();
    }


    public void contextInitialized(ServletContextEvent arg0) {
        System.out.println("Context initialized ... !");
        try {
            sshConnection.openSSH();
        } catch (Throwable e) {
            e.printStackTrace(); // error connecting SSH server
        }
    }


    public void contextDestroyed(ServletContextEvent arg0) {
        System.out.println("Context destroyed ... !");
        sshConnection.closeSSH(); // disconnect
    }

}