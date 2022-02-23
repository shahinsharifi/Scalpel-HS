package org.tudelft.wis.crowdsourcing.ssh;

import com.sshtools.client.SshClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.io.File;

@Component
public class SSHConnection {

    @Value("#{new Boolean('${ssh.portForwarding.enable}')}")
    private Boolean SSH_ENABLE;

    @Value("${ssh.privatekey}")
    private String S_PATH_FILE_PRIVATE_KEY;

    @Value("${ssh.passphrase}")
    private String S_PASS_PHRASE;

    @Value("#{new Integer('${ssh.local.port}')}")
    private Integer LOCAl_PORT;

    @Value("#{new Integer('${ssh.remote.port}')}")
    private Integer REMOTE_PORT;

    @Value("#{new Integer('${ssh.port}')}")
    private Integer SSH_REMOTE_PORT;

    @Value("${ssh.username}")
    private String SSH_USER;

    @Value("${ssh.host}")
    private String SSH_REMOTE_SERVER;

    @Value("${ssh.remote.server}")
    private String PG_REMOTE_SERVER;

    private SshClient ssh;


    public void openSSH() throws Throwable {
        if (SSH_ENABLE) {
            ssh = new SshClient(SSH_REMOTE_SERVER, SSH_REMOTE_PORT, SSH_USER,
                    2000000, new File(S_PATH_FILE_PRIVATE_KEY), S_PASS_PHRASE);

            /**
             * First we must allow forwarding. Without this no forwarding is possible. This
             * will allow us to forward from localhost and accept remote forwarding from the
             * remote server.
             */
            ssh.getContext().getForwardingPolicy().allowForwarding();

            /**
             * A local forward allows the ssh client user to connect to a resource
             * on the remote network
             */
            ssh.startLocalForwarding("localhost", LOCAl_PORT, PG_REMOTE_SERVER, REMOTE_PORT);
        }
    }

    public void closeSSH() {
        if (ssh != null && ssh.isConnected())
            ssh.disconnect();
    }
}
