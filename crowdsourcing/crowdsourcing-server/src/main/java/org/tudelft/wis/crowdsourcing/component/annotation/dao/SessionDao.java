package org.tudelft.wis.crowdsourcing.component.annotation.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Relations;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Scene;
import org.tudelft.wis.crowdsourcing.component.annotation.model.Session;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;


@Transactional
public interface SessionDao extends CrudRepository<Session, Integer> {


    @Query(value = "select a.id as id, a.task_id as task_id, a.time_elapsed as effort, a.pid as worker," +
            " a.instruction_time_effort as instruction, sa.is_typical as is_typical," +
            " sa.reason as reason, sa.wrong_label as wrong_label from session as a" +
            " join scene_annotation sa on a.id = sa.session_id", nativeQuery = true)
    List<Map<String,Object>> findAllSessions();

    @Query(value = "select count(*) as counter from session where session_id = :#{#session.sessionId}", nativeQuery = true)
    Integer getCountBySessionId(@Param("session") Session session);

}
