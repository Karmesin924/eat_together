package SWST.eat_together.domain.comment;


import SWST.eat_together.domain.member.Member;
import SWST.eat_together.domain.post.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    public int addComment(Member member, CommentDTO regiComment, Long postId) {
        Comment comment = new Comment();

        comment.setPostId(postId);
        comment.setContents(regiComment.getContents());
        comment.setNickname(member.getNickname());
        comment.setCreatedDate(LocalDate.now().toString());
        comment.setEmail(member.getEmail());

        try {
            commentRepository.save(comment);
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("comment = " + comment);
        return 1;
    }

    public Comment detail(long commentId, String email){
        Comment comment = commentRepository.findById(commentId);

        CommentDetailDTO commentDetail = new CommentDetailDTO();

        commentDetail.setCommentId(comment.getCommentId());
        commentDetail.setPostId(comment.getPostId());
        commentDetail.setContents(comment.getContents());
        commentDetail.setCreatedDate(comment.getCreatedDate());
        commentDetail.setNickname(commentDetail.getNickname());
        commentDetail.setEmail(commentDetail.getEmail());

        commentDetail.setAuthor(false);

        if(email != null && comment.getEmail().equals(email)) {
            commentDetail.setAuthor(true);
        }

        return commentDetail;
    }

    public Integer delete(Long commentId, String email) {
        Comment comment = commentRepository.getReferenceById(commentId);

        if(!email.equals(comment.getEmail()))
            return 1;
        commentRepository.delete(comment);

        return 0;

    }

    public Integer edit(Long commentId, String email, String contents) {
        Comment comment = commentRepository.getReferenceById(commentId);

        if (!email.equals(comment.getEmail()))
            return 1;
        /*postRepository.edit(idx, title, contents);*/
        comment.setContents(contents);
        commentRepository.save(comment);
        return 0;
    }

    public List<Comment> getComments(String idx) {
        List<Comment> comments = commentRepository.findByPostId(Long.parseLong(idx));
        return comments;
    }
}
