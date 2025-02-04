package com.vivah.app.repo;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;

import com.vivah.app.model.MatrimonyProfile;

@Repository
public class MatrimonyProfileRepositoryImpl {

    private final EntityManager entityManager;

    public MatrimonyProfileRepositoryImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<MatrimonyProfile> filterByField(String field, String value) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<MatrimonyProfile> criteriaQuery = criteriaBuilder.createQuery(MatrimonyProfile.class);
        Root<MatrimonyProfile> root = criteriaQuery.from(MatrimonyProfile.class);

        criteriaQuery.select(root)
                .where(criteriaBuilder.equal(criteriaBuilder.lower(root.get(field)), value.toLowerCase()));

        return entityManager.createQuery(criteriaQuery).getResultList();
    }
    
    public List<MatrimonyProfile> filterByFields(Map<String, String> filterParams) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<MatrimonyProfile> criteriaQuery = criteriaBuilder.createQuery(MatrimonyProfile.class);
        Root<MatrimonyProfile> root = criteriaQuery.from(MatrimonyProfile.class);

        Predicate[] predicates = filterParams.entrySet().stream()
                .map(entry -> criteriaBuilder.equal(
                        criteriaBuilder.lower(root.get(entry.getKey())), entry.getValue().toLowerCase()))
                .toArray(Predicate[]::new);

        criteriaQuery.select(root).where(predicates);

        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}
